import { Request, Response } from 'express';
import { pool } from '../server';

export const GetUsertype = async (req: Request, res: Response) => {
    // Verificar se o usuário está autenticado
    if (!req.session || !req.session.userId) {
        return res.status(401).json({ success: false, message: 'Usuário não autenticado' });
    }

    const query = `SELECT usertype FROM cadastro WHERE id = ?`;
    const values = [req.session.userId];

    try {
        // Consultar o banco de dados
        const [results]: any = await pool.query(query, values);

        if (results.length > 0) {
            // Se encontrar o usuário, retornar o tipo de usuário
            const user = results[0];
            return res.json({ success: true, usertype: user.usertype });
        } else {
            // Caso o usuário não seja encontrado
            return res.status(404).json({ success: false, message: 'Usuário não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao buscar tipo de usuário:', error);
        return res.status(500).json({ success: false, message: 'Erro no servidor' });
    }
};
