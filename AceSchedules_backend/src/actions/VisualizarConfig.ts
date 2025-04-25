import { Request, Response } from 'express';
import { pool } from '../server';
import { RowDataPacket } from 'mysql2';

export const VisualizarConfig = (req: Request, res: Response) => {
    console.log("Verificando a autenticação do usuário...");
    
    if (!req.session || !req.session.userId) {
        console.log("Usuário não autenticado. Retornando erro 401.");
        return res.status(401).json({ success: false, message: 'Usuário não autenticado' });
    }

    const query = `SELECT usuario, email, telefone, cnpj, usertype FROM cadastro WHERE id = ?`;
    console.log("Executando a consulta com o userId:", req.session.userId);

    pool.query(query, [req.session.userId], (err, results) => {
        if (err) {
            console.error("Erro ao executar a consulta:", err);
            return res.status(500).json({ success: false, message: 'Erro no servidor' });
        }

        if (Array.isArray(results) && results.length > 0) {
            const usuario = results[0] as RowDataPacket;

            console.log("Usuário encontrado:", usuario);

            return res.status(200).json({
                success: true,
                usuario
            });
        } else {
            console.log("Usuário não encontrado. Retornando erro 404.");
            return res.status(404).json({ success: false, message: 'Usuário não encontrado' });
        }
    });
};