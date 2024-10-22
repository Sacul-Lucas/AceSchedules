/* eslint-disable @typescript-eslint/no-explicit-any */
import mysql from 'mysql2/promise';
import { Request, Response } from 'express';

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '201024',
  database: 'aceschedules',
  port: 5500,
});

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
    
      const connection = await pool.getConnection();
      try {
        const [rows] = await connection.query<any[]>(sql, params);
        const [totalResult] = await connection.query<any[]>(sqlTotal, params);
        const [bloqueadasResult] = await connection.query<any[]>(sqlBloqueadas, params);
      
        if (Array.isArray(rows)) {
          const total = totalResult[0].total;
          const bloqueadas = bloqueadasResult[0].bloqueadas;
          res.json({ salas: rows, total, bloqueadas });
        } else {
          res.status(500).json({ success: false, message: 'Erro ao carregar salas.' });
        }
      } catch (error) {
        console.error('Erro na consulta ao banco de dados:', error);
        res.status(500).json({ success: false, message: 'Erro ao carregar salas.' });
      } finally {
        connection.release();
      }
    } else if (currPath.includes('/Reservas')) {
      const { status, sala = '', data = '', hora = '', nome = '' } = req.query;
      let sql = `SELECT r.id, DATE_FORMAT(r.dataAgendamentoInicial, '%d/%m/%Y %H:%i:%s') as dataAgendamentoInicial, DATE_FORMAT(r.dataAgendamentoFinal, '%d/%m/%Y %H:%i:%s') as dataAgendamentoFinal, s.nome AS sala_nome, c.usuario AS usuario
                   FROM reservas r
                   JOIN salas s ON r.sala = s.id
                   JOIN cadastro c ON r.usuario = c.id
                   WHERE r.status = ?`;
      const params: any[] = [status];
    
      if (sala) {
        sql += ' AND s.id LIKE ?';
        params.push(sala);
      }
      if (data) {
        sql += ' AND r.dataAgendamentoInicial >= ?'; // Changed to >=
        params.push(data);
      }
      if (hora) {
        sql += ' AND r.dataAgendamentoFinal <= ?'; // Changed to <=
        params.push(hora);
      }
      if (nome) {
        sql += ' AND c.usuario LIKE ?';
        params.push(`%${nome}%`);
      }
      
      // Query for total count of filtered reservations
      let sqlTotal = `SELECT COUNT(*) as total 
                       FROM reservas r
                       WHERE r.status = ?`;
      const totalParams: any[] = [status];
      if (sala) {
        sqlTotal += ' AND r.sala IN (SELECT id FROM salas WHERE id LIKE ?)';
        totalParams.push(sala);
      }
      if (data) {
        sqlTotal += ' AND r.dataAgendamentoInicial >= ?'; // Changed to >=
        totalParams.push(data);
      }
      if (hora) {
        sqlTotal += ' AND r.dataAgendamentoFinal <= ?'; // Changed to <=
        totalParams.push(hora);
      }
      if (nome) {
        sqlTotal += ' AND r.usuario IN (SELECT id FROM cadastro WHERE usuario LIKE ?)';
        totalParams.push(`%${nome}%`);
      }
      
      // Execute queries
      const connection = await pool.getConnection();
      const [reservas] = await connection.query<any[]>(sql, params);
      const [[{ total }]] = await connection.query<any[]>(sqlTotal, totalParams);
      
      connection.release();
    
      if (Array.isArray(reservas)) {
        res.json({ reservas, total });
      } else {
        res.status(500).json({ success: false, message: 'Erro ao carregar reservas.' });
      }
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

      const connection = await pool.getConnection();
      const [rows] = await connection.query<any[]>(sql, params);
      const [totalResult] = await connection.query<any[]>(sqlTotal, params);

      connection.release();

      if (Array.isArray(rows)) {
        const total = totalResult[0]?.total ?? 0;
        if (rows.length === 0) {
          res.json({ success: false, message: "Usuário não foi encontrado/a" });
        } else {
          res.json({ success: true, Usuarios: rows, total });
        }
      } else {
        res.status(500).json({ success: false, message: 'Erro ao carregar usuários.' });
      }

    } else {
      res.status(400).json({ success: false, message: 'Caminho inválido.' });
    }
  } catch (err) {
    console.error('Erro ao buscar dados:', err);
    res.status(500).json({ success: false, message: 'Erro ao buscar dados.' });
  }
};