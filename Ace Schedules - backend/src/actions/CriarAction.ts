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

// Transformar `pool.query` em uma função que retorna uma promise
function queryDatabase(query: string, params: any[]) {
    return new Promise((resolve, reject) => {
        pool.query(query, params, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

export const CriarAction = async (req: Request, res: Response) => {
    app.use(cors({
        origin: 'http://localhost:5000',
        credentials: true,
        optionsSuccessStatus: 200
    }));

    if (!req.body) {
        return res.status(400).json({ success: false, message: 'Corpo da solicitação está vazio' });
    }

    const currPath = req.route.path;
    let reqRoute = '';
    let msgId = '';
    let varsAction = '';
    let valuesAction = '';
    let dados: any[] = [];

    try {
        if (currPath === '/Salas/CriarAction') {
            reqRoute = 'salas';
            msgId = 'Sala';
            varsAction = '(caracteristicas)';
            valuesAction = '(?)';

            const { caracteristicas } = req.body;

            if (!caracteristicas) {
                return res.json({ success: false, message: 'Campos obrigatórios faltando' });
            }

            dados = [caracteristicas];

        } else if (currPath === '/Reservas/CriarAction') {
            reqRoute = 'reservas';
            msgId = 'Reserva';
            varsAction = '(dataAgendamento, horaAgendamento, sala, usuario, status)';
            valuesAction = '(?, ?, ?, 1 , true)';

            const { dataAgendamento, horaAgendamento, sala, status } = req.body;

            if (!dataAgendamento || !horaAgendamento || !sala || !status) {
                return res.json({ success: false, message: 'Campos obrigatórios faltando' });
            }

            dados = [dataAgendamento, horaAgendamento, sala, status];

            // Verificar duplicação de reserva
            const checkQuery = `
                SELECT dataAgendamento, horaAgendamento, sala FROM reservas 
                WHERE dataAgendamento = ? AND horaAgendamento = ? AND sala = ?
            `;
            const rows: any = await queryDatabase(checkQuery, [dataAgendamento, horaAgendamento, sala]);

            if (rows.length > 0) {
                return res.json({ success: false, message: 'Horário já ocupado' });
            }

        } else { 
            reqRoute = 'cadastro';
            msgId = 'Usuário';
            varsAction = '(usuario, email, senha, usertype, telefone, cnpj)';
            valuesAction = '(?, ?, ?, ?, ?, ?)';

            const { usuario, email, senha, usertype, telefone, cnpj } = req.body;

            if (!usuario || !email || !senha || !usertype || !telefone || !cnpj) {
                return res.json({ success: false, message: 'Campos obrigatórios faltando' });
            }

            dados = [usuario, email, senha, usertype, telefone, cnpj];

            // Verificar duplicação de email, telefone ou CNPJ
            const checkQuery = `
                SELECT email, cnpj, telefone FROM cadastro 
                WHERE email = ? OR cnpj = ? OR telefone = ?
            `;
            const rows: any = await queryDatabase(checkQuery, [email, cnpj, telefone]);

            if (rows.length > 0) {
                const existingUser = rows[0];

                if (email === existingUser.email) {
                    return res.json({ success: false, message: 'Email já cadastrado' });
                }

                if (cnpj === existingUser.cnpj) {
                    return res.json({ success: false, message: 'CNPJ já cadastrado' });
                }

                if (telefone === existingUser.telefone) {
                    return res.json({ success: false, message: 'Telefone já cadastrado' });
                }
            }
        }

        // Inserir os dados na tabela correspondente
        const insertQuery = `
            INSERT INTO ${reqRoute} ${varsAction} VALUES ${valuesAction}
        `;
        await queryDatabase(insertQuery, dados);

        return res.json({ success: true, message: `${msgId} cadastrado com sucesso` });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Erro no servidor' });
    }
};

// export const CriarAction = (req: Request, res: Response) => {
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
//     let varsAction = '';
//     let valuesAction ='';

//     if (currPath === '/Salas/CriarAction') {
//         reqRoute = 'salas'
//         msgId = 'Sala'
//         varsAction = '(caracteristicas)'
//         valuesAction = '(:ca)'
       
//     }else if (currPath === '/Reservas/CriarAction'){
//         reqRoute = 'reservas'
//         msgId = 'Reserva'
//         varsAction = '(dataAgendamento, horaAgendamento, sala, status)'
//         valuesAction = '(:da, :ho, :sa, :st)'
//     }else{
//         reqRoute = 'cadastro'
//         msgId = 'Usuário'
//         varsAction = '(usuario, email, senha, usertype, telefone, cnpj)'
//         valuesAction = '(?, ?, ?, ?, ?, ?)';
//     }

//     const { id } = req.body;
    
//     const query = `INSERT INTO ${reqRoute} ${varsAction} VALUES ${valuesAction}`;
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