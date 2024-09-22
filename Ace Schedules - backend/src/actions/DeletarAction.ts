import mysql from 'mysql';
import { Request, Response } from 'express';



const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '201024',
    database: 'aceschedules',
    port: 5500
});

export const DeletarAction = (req: Request, res: Response) => {
    const { id } = req.body;  // Verifica se o id está vindo do corpo da requisição

    if (!id) {
        return res.status(400).json({ success: false, message: 'ID não fornecido.' });
    }

    const currPath = req.originalUrl; // Use req.originalUrl para capturar o caminho completo da requisição
    let reqRoute = '';
    let msgId = '';

    if (currPath.includes('/Salas')) {
        reqRoute = 'salas';
        msgId = 'Sala';
    } else if (currPath.includes('/Reservas')) {
        reqRoute = 'reservas';
        msgId = 'Reserva';
    } else if (currPath.includes('/Usuarios')) {
        reqRoute = 'cadastro'; 
        msgId = 'Usuário';
    } else {
        return res.status(400).json({ success: false, message: 'Caminho de deleção inválido.' });
    }

    const query = `DELETE FROM ${reqRoute} WHERE id = ?`;
    const values = [id];

    pool.query(query, values, (error, results) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: 'Erro no servidor' });
        }

        if (results.affectedRows > 0) {
            return res.json({ success: true, message: `${msgId} deletado(a) com sucesso!` });
        } else {
            return res.json({ success: false, message: `Falha ao deletar ${msgId}: item não encontrado.` });
        }
    });
};