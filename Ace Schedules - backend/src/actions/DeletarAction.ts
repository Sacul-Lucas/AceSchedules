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

// export const DeletarAction = (req: Request, res: Response) => {
//     app.use(cors({
//         origin: 'http://localhost:5000',
//         credentials: true,
//         optionsSuccessStatus: 200
//     }));

//     if (!req.body) {
//         return res.status(400).json({ success: false, message: 'Corpo da solicitação está vazio' });
//     }

//     //INSTAVEL - Talvez precise mudar o req.route
//     const currPath = req.route;
//     let reqRoute = '';
//     let msgId = '';

//     if (currPath === '/Salas/DeletarAction') {
//         reqRoute = 'salas'
//         msgId = 'Sala'
//     }else if (currPath === '/Reservas/DeletarAction'){
//         reqRoute = 'reservas'
//         msgId = 'Reserva'
//     }else{
//         reqRoute = 'cadastro'
//         msgId = 'Usuário'
//     }

//     const { id } = req.body;

//     const query = `DELETE FROM ${reqRoute} WHERE id=?`;
//     const values = [id];

//     pool.query(query, values, (error, results) => {
//         if (error) {
//             console.log(error);
//             return res.status(500).json({ success: false, message: 'Erro no servidor' });
//         }

//         if (!id) {
//             return res.json({ success: false, message: `${msgId} não foi encontrado/a` });
//         }

//         if (results.length > 0) {
//             const reserva = results[0];

//             if (id === reserva.id) {
//                 return res.json({ success: true, message: `${msgId} deletado/a com successo!` });
//             }
//         } else {
//             return res.json({ success: false, message: `Falha ao deletar ${msgId}` });
//         }
//     });
// };

export const DeletarAction = (req: Request, res: Response) => {
    const { id } = req.body;  // Verifica se o id está vindo do corpo da requisição

    if (!id) {
        return res.status(400).json({ success: false, message: 'ID não fornecido.' });
    }

    const currPath = req.originalUrl; // Use req.originalUrl para capturar o caminho completo da requisição
    let reqRoute = '';
    let msgId = '';

    if (currPath.includes('/Salas/Deletar')) {
        reqRoute = 'salas';
        msgId = 'Sala';
    } else if (currPath.includes('/Reservas/Deletar')) {
        reqRoute = 'reservas';
        msgId = 'Reserva';
    } else if (currPath.includes('/Usuarios/Deletar')) {
        reqRoute = 'cadastro';  // Assumindo que a tabela de usuários se chama "cadastro"
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