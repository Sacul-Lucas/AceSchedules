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

export const VisualizarAction = (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ success: false, message: 'ID do usuário não fornecido' });
    }

    const currPath = req.originalUrl;
    let reqRoute = '';
    let msgId = '';
    let query = '';

    if (currPath.includes('/Salas/Visualizar')) {
        reqRoute = 'salas';
        msgId = 'Sala';
        query = `SELECT * FROM ${reqRoute} WHERE id=?`;

    } else if (currPath.includes('/Reservas')) {
        reqRoute = 'reservas';
        msgId = 'Reserva';
        query = `SELECT 
                r.id AS id, 
                DATE_FORMAT(r.dataAgendamentoInicial, '%d/%m/%Y %H:%i:%s') AS data, 
                DATE_FORMAT(r.dataAgendamentoFinal, '%d/%m/%Y %H:%i:%s') AS hora, 
                s.id AS SalaId, 
                s.nome AS salaAlocada, 
                c.usuario AS locador, 
                c.email AS emailLocador, 
                c.telefone AS contatoLocador, 
                c.cnpj AS cnpjLocador, 
                r.status
            FROM reservas r
            JOIN salas s ON r.sala = s.id
            JOIN cadastro c ON r.usuario = c.id
            WHERE r.id = ?;`;

    } else {
        reqRoute = 'cadastro';
        msgId = 'Usuário';
        query = `SELECT * FROM ${reqRoute} WHERE id=?`;

    }

    
    const values = [id];

    pool.query(query, values, (error, results) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: 'Erro no servidor' });
        }

        if (results.length > 0) {
            const dataReturn = results[0];
            return res.json({ success: true, data: dataReturn, message: `${msgId} visualizado/a com sucesso!` });
        } else {
            return res.json({ success: false, message: `${msgId} não foi encontrado/a` });
        }
    });
};