import { Request, Response } from 'express';
import { pool } from '../server';
import { RowDataPacket } from 'mysql2';

export const GetUsertype = (req: Request, res: Response) => {
    if (!req.session || !req.session.userId) {
        return res.status(401).json({ success: false, message: 'Usuário não autenticado' });
    }

    const query = `SELECT usertype FROM cadastro WHERE id = ?`;
    const values = [req.session.userId];

    pool.query(query, values, (error, results) => {
        if (error) {
            return res.status(500).json({ success: false, message: 'Erro no servidor' });
        }

        // Verificando se o resultado é do tipo RowDataPacket[] (um array de resultados)
        if (Array.isArray(results) && results.length > 0) {
            // Aqui fazemos o cast para RowDataPacket[] para garantir que o TypeScript entenda o tipo correto.
            const user = results[0] as RowDataPacket; // O resultado é um RowDataPacket
            return res.json({ success: true, usertype: user.usertype });
        } else {
            return res.status(404).json({ success: false, message: 'Usuário não encontrado' });
        }
    });
};