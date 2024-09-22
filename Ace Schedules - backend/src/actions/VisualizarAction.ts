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

// Função de visualização
export const VisualizarAction = (req: Request, res: Response) => {
    // Obtenha o ID dos parâmetros da URL
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ success: false, message: 'ID do usuário não fornecido' });
    }

    // Determine a rota com base no caminho atual
    const currPath = req.originalUrl; // Usa req.path para verificar o caminho
    let reqRoute = '';
    let msgId = '';
    let dataReturn = ''; 
    let query = '';

    if (currPath.includes('/Salas/Visualizar')) {
        reqRoute = 'salas';
        msgId = 'Sala';
        dataReturn = 'sala';
        query = `SELECT * FROM ${reqRoute} WHERE id=?`;

    } else if (currPath.includes('/Reservas')) {
        reqRoute = 'reservas';
        msgId = 'Reserva';
        dataReturn = 'reserva';
        query = `SELECT 
                r.id AS id, 
                DATE_FORMAT(r.dataAgendamento, '%Y-%m-%d') AS data, 
                r.horaAgendamento AS hora, 
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
        dataReturn = 'usuario';
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