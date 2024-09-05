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

export const EditarAction = (req: Request, res: Response) => {
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

    if (currPath === '/Salas/DeletarAction') {
        reqRoute = 'salas'
        msgId = 'Sala'
        varsAction = 'caracteristicas='$caracteristicas''
       
    }else if (currPath === '/Reservas/DeletarAction'){
        reqRoute = 'reservas'
        msgId = 'Reserva'
        varsAction = 'dataAgendamento='$dataAgendamento', horaAgendamento='$horaAgendamento', sala='$sala_nome''
    }else{
        reqRoute = 'cadastro'
        msgId = 'Usuário'
        varsAction = 'usuario='$usuario', email='$email', senha='$senha', usertype='$usertype', telefone='$telefone', cnpj='$cnpj''
    }

    const { id } = req.body;
    
    const query = `UPDATE ${reqRoute} SET ${varsAction},'WHERE id=?`;
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