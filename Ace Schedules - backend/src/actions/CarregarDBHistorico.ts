import { Request, Response } from 'express';
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '201024',
  database: 'aceschedules',
  port: 5500,
});

export const CarregarDBHistorico = async (req: Request, res: Response) => {
  try {
    // Verifique se o usuário está autenticado e a sessão existe
    if (!req.session || !req.session.userId) {
      console.log("Usuário não autenticado. Retornando erro 401.");
      return res.status(401).json({ success: false, message: 'Usuário não autenticado' });
    }

    // Agora, utilize req.session.userId para fazer as consultas relacionadas ao usuário autenticado
    const { status, sala = '', dataIN = '', dataFN = '' } = req.query;
    const userId = req.session.userId;

    // Log dos valores recebidos do filtro
    console.log('Filtros recebidos:', { status, sala, dataIN, dataFN });

    const statusNumber = status === 'true' ? 1 : 0;

    let sql = `
      SELECT r.id, 
            DATE_FORMAT(r.dataAgendamentoInicial, '%d/%m/%Y %H:%i:%s') as dataAgendamentoInicial, 
            DATE_FORMAT(r.dataAgendamentoFinal, '%d/%m/%Y %H:%i:%s') as dataAgendamentoFinal, 
            s.nome AS sala_nome
      FROM reservas r
      JOIN salas s ON r.sala = s.id
      JOIN cadastro c ON r.usuario = c.id
      WHERE r.status = ? AND r.usuario = ?
    `;

    const params: any[] = [statusNumber, userId];  // Utilize o userId da sessão

    if (sala) {
      sql += ' AND sala LIKE ?';
      params.push(sala);
    }
    if (dataIN) {
      sql += ' AND r.dataAgendamentoInicial >= ?'; 
      params.push(dataIN);
    }
    if (dataFN) {
      sql += ' AND r.dataAgendamentoFinal <= ?'; 
      params.push(dataFN);
    }

    // Query para contar o total de reservas filtradas
    let sqlTotal = `
      SELECT COUNT(*) as total 
      FROM reservas r
      WHERE r.status = ? AND r.usuario = ?`;

    const totalParams: any[] = [statusNumber, userId];  // Utilize o userId da sessão

    if (sala) {
      sqlTotal += ' AND r.sala IN (SELECT id FROM salas WHERE id LIKE ?)';
      totalParams.push(sala);
    }
    if (dataIN) {
      sqlTotal += ' AND r.dataAgendamentoInicial >= ?'; 
      totalParams.push(dataIN);
    }
    if (dataFN) {
      sqlTotal += ' AND r.dataAgendamentoFinal <= ?'; 
      totalParams.push(dataFN);
    }

    // Executar consultas
    const connection = await pool.getConnection();
    try {
      // Executa a consulta das reservas
      const [reservas] = await connection.query<any[]>(sql, params);
      console.log('Reservas retornadas:', reservas);  // Loga o resultado das reservas

      // Executa a consulta do total
      const [[{ total }]] = await connection.query<any[]>(sqlTotal, totalParams);
      console.log('Total de reservas retornadas:', total);  // Loga o resultado do total

      // Enviar resposta ao frontend
      res.json({ success: true, reservas, total });
    } finally {
      connection.release();  // Assegura liberação da conexão
    }
  } catch (error) {
    console.error('Erro ao carregar reservas:', error);
    res.status(500).json({ success: false, message: 'Erro ao carregar reservas.' });
  }
};