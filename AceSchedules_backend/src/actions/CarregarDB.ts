/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { pool } from '../server';

export const CarregarDB = async (req: Request, res: Response) => {
  const currPath = req.originalUrl;
  let sql = '';
  let sqlTotal = '';
  const params: any[] = [];

  try {
    if (currPath.includes('/Salas')) {
      const { filter_nome = '', apenas_bloqueadas = 'false' } = req.query;

      sql = `SELECT id, nome, descricao, status, backImg, caracteristicas FROM salas WHERE 1=1`;
      sqlTotal = `SELECT COUNT(*) AS total FROM salas WHERE 1=1`;
      let sqlBloqueadas = `SELECT COUNT(*) AS bloqueadas FROM salas WHERE status = 1`;

      if (filter_nome) {
        sql += ` AND nome LIKE ?`;
        sqlTotal += ` AND nome LIKE ?`;
        sqlBloqueadas += ` AND nome LIKE ?`;
        params.push(`%${filter_nome}%`);
      }

      if (apenas_bloqueadas === 'true') {
        sql += ` AND status = 1`;
        sqlTotal += ` AND status = 1`;
      }

      pool.query(sql, params, (error, rows) => {
        if (error) {
          console.error('Erro na consulta ao banco de dados:', error);
          return res.status(500).json({ success: false, message: 'Erro ao carregar salas.' });
        }

        pool.query(sqlTotal, params, (error, totalResult) => {
          if (error) {
            console.error('Erro ao contar o total de salas:', error);
            return res.status(500).json({ success: false, message: 'Erro ao carregar salas.' });
          }

          pool.query(sqlBloqueadas, params, (error, bloqueadasResult) => {
            if (error) {
              console.error('Erro ao contar as salas bloqueadas:', error);
              return res.status(500).json({ success: false, message: 'Erro ao carregar salas.' });
            }

            if (Array.isArray(rows)) {
              const total = totalResult[0].total;
              const bloqueadas = bloqueadasResult[0].bloqueadas;
              return res.json({ salas: rows, total, bloqueadas });
            } else {
              return res.status(500).json({ success: false, message: 'Erro ao carregar salas.' });
            }
          });
        });
      });

    } else if (currPath.includes('/Reservas')) {
      const { status, sala = '', data = '', hora = '', nome = '' } = req.query;

      sql = `SELECT r.id, DATE_FORMAT(r.dataAgendamentoInicial, '%d/%m/%Y %H:%i:%s') as dataAgendamentoInicial,
                    DATE_FORMAT(r.dataAgendamentoFinal, '%d/%m/%Y %H:%i:%s') as dataAgendamentoFinal,
                    s.nome AS sala_nome, c.usuario AS usuario
             FROM reservas r
             JOIN salas s ON r.sala = s.id
             JOIN cadastro c ON r.usuario = c.id
             WHERE r.status = ?`;

      const queryParams: any[] = [status];

      if (sala) {
        sql += ' AND s.id LIKE ?';
        queryParams.push(sala);
      }
      if (data) {
        sql += ' AND r.dataAgendamentoInicial = ?';
        queryParams.push(data);
      }
      if (hora) {
        sql += ' AND r.dataAgendamentoFinal = ?';
        queryParams.push(hora);
      }
      if (nome) {
        sql += ' AND c.usuario LIKE ?';
        queryParams.push(`%${nome}%`);
      }

      sqlTotal = `SELECT COUNT(*) as total FROM reservas r WHERE r.status = ?`;
      const totalParams: any[] = [status];

      if (sala) {
        sqlTotal += ' AND r.sala IN (SELECT id FROM salas WHERE id LIKE ?)';
        totalParams.push(sala);
      }
      if (data) {
        sqlTotal += ' AND r.dataAgendamentoInicial = ?';
        totalParams.push(data);
      }
      if (hora) {
        sqlTotal += ' AND r.dataAgendamentoFinal = ?';
        totalParams.push(hora);
      }
      if (nome) {
        sqlTotal += ' AND r.usuario IN (SELECT id FROM cadastro WHERE usuario LIKE ?)';
        totalParams.push(`%${nome}%`);
      }

      // Usando callbacks para a consulta de reservas
      pool.query(sql, queryParams, (error, reservas) => {
        if (error) {
          console.error('Erro ao carregar reservas:', error);
          return res.status(500).json({ success: false, message: 'Erro ao carregar reservas.' });
        }

        pool.query(sqlTotal, totalParams, (error, totalResult) => {
          if (error) {
            console.error('Erro ao contar total de reservas:', error);
            return res.status(500).json({ success: false, message: 'Erro ao carregar reservas.' });
          }

          if (Array.isArray(reservas)) {
            const total = totalResult[0].total;
            return res.json({ reservas, total });
          } else {
            return res.status(500).json({ success: false, message: 'Erro ao carregar reservas.' });
          }
        });
      });

    } else if (currPath.includes('/Usuarios')) {
      const { user_type = '', email = '', nome = '' } = req.query;

      sql = `SELECT * FROM cadastro WHERE 1=1`;
      sqlTotal = `SELECT COUNT(*) AS total FROM cadastro WHERE 1=1`;

      if (user_type && user_type !== "---Todos---") {
        sql += ` AND usertype = ?`;
        sqlTotal += ` AND usertype = ?`;
        params.push(user_type);
      }
      if (email) {
        sql += ` AND email LIKE ?`;
        sqlTotal += ` AND email LIKE ?`;
        params.push(`%${email}%`);
      }
      if (nome) {
        sql += ` AND usuario LIKE ?`;
        sqlTotal += ` AND usuario LIKE ?`;
        params.push(`%${nome}%`);
      }

      // Usando callbacks para a consulta de usuários
      pool.query(sql, params, (error, rows) => {
        if (error) {
          console.error('Erro ao carregar usuários:', error);
          return res.status(500).json({ success: false, message: 'Erro ao carregar usuários.' });
        }

        pool.query(sqlTotal, params, (error, totalResult) => {
          if (error) {
            console.error('Erro ao contar total de usuários:', error);
            return res.status(500).json({ success: false, message: 'Erro ao carregar usuários.' });
          }

          if (Array.isArray(rows)) {
            const total = totalResult[0]?.total ?? 0;
            if (rows.length === 0) {
              return res.json({ success: false, message: "Usuário não foi encontrado/a" });
            } else {
              return res.json({ success: true, Usuarios: rows, total });
            }
          } else {
            return res.status(500).json({ success: false, message: 'Erro ao carregar usuários.' });
          }
        });
      });

    } else {
      return res.status(400).json({ success: false, message: 'Caminho inválido.' });
    }
  } catch (err) {
    console.error('Erro ao buscar dados:', err);
    return res.status(500).json({ success: false, message: 'Erro ao buscar dados.' });
  }
};
