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

export const CriarAction = (req: Request, res: Response) => {
    app.use(cors({
        origin: 'http://localhost:5000',
        credentials: true,
        optionsSuccessStatus: 200
    }));

    if (!req.body) {
        return res.status(400).json({ success: false, message: 'Corpo da solicitação está vazio' });
    }

    //INSTAVEL - Talvez precise mudar o req.route
    const currPath = req.route;
    let reqRoute = '';
    let msgId = '';
    let varsAction = '';
    let valuesAction ='';

    if (currPath === '/Salas/CriarAction') {
        reqRoute = 'salas'
        msgId = 'Sala'
        varsAction = '(caracteristicas)'
        valuesAction = '(:ca)'
       
    }else if (currPath === '/Reservas/CriarAction'){
        reqRoute = 'reservas'
        msgId = 'Reserva'
        varsAction = '(dataAgendamento, horaAgendamento, sala, status)'
        valuesAction = '(:da, :ho, :sa, :st)'
    }else{
        reqRoute = 'cadastro'
        msgId = 'Usuário'
        varsAction = '(nome, capacidade, img)'
        valuesAction = '(:na, :cap, :im)'
    }

    const { id } = req.body;
    
    const query = `INSERT INTO ${reqRoute} ${varsAction} VALUES ${valuesAction}`;
    const values = [id];

    pool.query(query, values, (error, results) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: 'Erro no servidor' });
        }

        if (!id) {
            return res.json({ success: false, message: `${msgId} não foi encontrado/a` });
        }

        if (results.length > 0) {
            const reserva = results[0];

            if (id === reserva.id) {
                return res.json({ success: true, message: `${msgId} deletado/a com successo!` });
            }
        } else {
            return res.json({ success: false, message: `Falha ao deletar ${msgId}` });
        }
    });
};