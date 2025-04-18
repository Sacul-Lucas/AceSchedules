import { Request, Response } from 'express';
import mysql from 'mysql';

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '201024',
    database: 'aceschedules',
    port: 5500
});

export const GetUsername = (req: Request, res: Response) => {
    if (!req.session || !req.session.userId) {
        return res.status(401).json({ success: false, message: 'Usuário não autenticado' });
    }

    const query = `SELECT usuario FROM cadastro WHERE id = ?`;
    const values = [req.session.userId];

    pool.query(query, values, (error, results) => {
        if (error) {
            return res.status(500).json({ success: false, message: 'Erro no servidor' });
        }
    
        if (results.length > 0) {
            const user = results[0];
            return res.json({ success: true, usuario: user.usuario});
        } else {
            return res.status(404).json({ success: false, message: 'Usuário não encontrado' });
        }
    });
};