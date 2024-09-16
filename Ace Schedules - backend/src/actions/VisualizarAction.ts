import mysql from 'mysql';
import { Request, Response } from 'express';
import { app } from '../server';
import cors from 'cors';

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '201024',
    database: 'aceschedules',
    port: 5500
});

// Função de visualização
export const VisualizarAction = (req: Request, res: Response) => {
    // Obtenha o ID dos parâmetros da URL
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ success: false, message: 'ID do usuário não fornecido' });
    }

    // Determine a rota com base no caminho atual
    const currPath = req.path; // Usa req.path para verificar o caminho
    let reqRoute = '';
    let msgId = '';

    if (currPath.includes('/Salas/VisualizarAction')) {
        reqRoute = 'salas';
        msgId = 'Sala';
    } else if (currPath.includes('/Reservas/VisualizarAction')) {
        reqRoute = 'reservas';
        msgId = 'Reserva';
    } else {
        reqRoute = 'cadastro';
        msgId = 'Usuário';
    }

    const query = `SELECT * FROM ${reqRoute} WHERE id=?`;
    const values = [id];

    pool.query(query, values, (error, results) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: 'Erro no servidor' });
        }

        if (results.length > 0) {
            const usuario = results[0];
            return res.json({ success: true, data: usuario, message: `${msgId} visualizado/a com sucesso!` });
        } else {
            return res.json({ success: false, message: `${msgId} não foi encontrado/a` });
        }
    });
};