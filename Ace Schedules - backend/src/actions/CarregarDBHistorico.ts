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

export const CarregarDBHistorico = async (req: Request, res: Response) => {

    if (!req.session || !req.session.userId) {
        console.log("Usuário não autenticado. Retornando erro 401.");
        return res.status(401).json({ success: false, message: 'Usuário não autenticado' });
    }

    const { status, sala = '', data = '', hora = ''} = req.query;
        let sql = `SELECT r.id, DATE_FORMAT(r.dataAgendamentoInicial, '%d/%m/%Y %H:%i:%s') as dataAgendamentoInicial, DATE_FORMAT(r.dataAgendamentoFinal, '%d/%m/%Y %H:%i:%s') as dataAgendamentoFinal, s.nome AS sala_nome, c.usuario AS usuario
                    FROM reservas r
                    JOIN salas s ON r.sala = s.id
                    JOIN cadastro c ON r.usuario = c.id
                    WHERE r.status = ?`;
        const params: any[] = [status];
    
      if (sala) {
        sql += ' AND s.id LIKE ?';
        params.push(`%${sala}%`);
      }
      if (data) {
        sql += ' AND r.dataAgendamentoInicial >= ?'; // Changed to >=
        params.push(data);
      }
      if (hora) {
        sql += ' AND r.dataAgendamentoFinal <= ?'; // Changed to <=
        params.push(hora);
      }
      
      // Query for total count of filtered reservations
      let sqlTotal = `SELECT COUNT(*) as total 
                       FROM reservas r
                       WHERE r.status = ?`;
      const totalParams: any[] = [status];
      if (sala) {
        sqlTotal += ' AND r.sala IN (SELECT id FROM salas WHERE id LIKE ?)';
        totalParams.push(`%${sala}%`);
      }
      if (data) {
        sqlTotal += ' AND r.dataAgendamentoInicial >= ?'; // Changed to >=
        totalParams.push(data);
      }
      if (hora) {
        sqlTotal += ' AND r.dataAgendamentoFinal <= ?'; // Changed to <=
        totalParams.push(hora);
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
}