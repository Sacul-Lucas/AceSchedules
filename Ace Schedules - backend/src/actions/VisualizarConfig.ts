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
    });
};