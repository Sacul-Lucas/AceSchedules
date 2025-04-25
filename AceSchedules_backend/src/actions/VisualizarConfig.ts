import { Request, Response } from 'express';
import { pool } from '../server';

export const VisualizarConfig = async (req: Request, res: Response) => {
    console.log("Verificando a autenticação do usuário...");

    if (!req.session || !req.session.userId) {
        console.log("Usuário não autenticado. Retornando erro 401.");
        return res.status(401).json({ success: false, message: 'Usuário não autenticado' });
    }

    const query = `SELECT usuario, email, telefone, cnpj, usertype FROM cadastro WHERE id = ?`;
    console.log("Executando a consulta com o userId:", req.session.userId);

    try {
        const [results]: any = await pool.query(query, [req.session.userId]);

        console.log("Resultados da consulta:", results);

        if (results.length === 0) {
            console.log("Usuário não encontrado. Retornando erro 404.");
            return res.status(404).json({ success: false, message: 'Usuário não encontrado' });
        }

        console.log("Usuário encontrado:", results[0]);

        return res.status(200).json({
            success: true,
            usuario: results[0]
        });
    } catch (error) {
        console.error("Erro ao executar a consulta:", error);
        return res.status(500).json({ success: false, message: 'Erro no servidor' });
    }
};