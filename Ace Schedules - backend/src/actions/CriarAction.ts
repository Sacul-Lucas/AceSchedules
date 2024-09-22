/* eslint-disable @typescript-eslint/no-explicit-any */
import mysql from 'mysql';
import { Request, Response } from 'express';
import { app } from '../server';
import cors from 'cors';
import bcrypt from 'bcrypt';


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

    const currPath = req.originalUrl;
    let reqRoute = '';
    let msgId = '';
    let varsAction = '';
    let valuesAction = '';
    let dados: any[] = [];

    try {
        if (currPath.includes('/Salas')) {
            reqRoute = 'salas';
            msgId = 'Sala';
            varsAction = '(caracteristicas)';
            valuesAction = '(?)';

            const { caracteristicas } = req.body;

            if (!caracteristicas) {
                return res.json({ success: false, message: 'Campos obrigatórios faltando' });
            }

            dados = [caracteristicas];

        } else if (currPath.includes('/Reservas')) {
            reqRoute = 'reservas';
            msgId = 'Reserva';
            varsAction = '(dataAgendamentoInicial, dataAgendamentoFinal, sala, status)';
            valuesAction = '(?, ?, ?, true)';

            const { salaAlocada: sala, dataAgendamentoInicial, dataAgendamentoFinal } = req.body;

            if (!dataAgendamentoInicial || !dataAgendamentoFinal  || !sala) {
                return res.json({ success: false, message: 'Por favor, selecione um intervalo de datas e horários válidos' });
            }

            dados = [dataAgendamentoInicial, dataAgendamentoFinal, sala];

            // Verificar duplicação de reserva
            const checkQuery = `
                SELECT dataAgendamentoInicial, dataAgendamentoFinal, sala FROM reservas 
                WHERE dataAgendamentoInicial = ? AND dataAgendamentoFinal = ? AND sala = ?
            `;
            const rows: any = await queryDatabase(checkQuery, [dataAgendamentoInicial, dataAgendamentoFinal, sala]);

            if (rows.length > 0) {
                return res.json({ success: false, message: 'Período de agendamento já reservado' });
            }

        } else if (currPath.includes('/Usuarios')) {
            reqRoute = 'cadastro';
            msgId = 'Usuário';
            varsAction = '(usuario, email, senha, usertype, telefone, cnpj)';
            valuesAction = '(?, ?, ?, ?, ?, ?)';
            const { usuario, email, senha, usertype, telefone, cnpj } = req.body;

            if (!usuario || !email || !senha || !usertype || !telefone || !cnpj) {
                return res.json({ success: false, message: 'Campos obrigatórios faltando' });
            }

            // Verificar duplicação de email, telefone ou CNPJ
            const checkQuery = `
                SELECT usuario, email, cnpj, telefone FROM cadastro 
                WHERE usuario = ? OR email = ? OR cnpj = ? OR telefone = ?
            `;
            const rows: any = await queryDatabase(checkQuery, [usuario, email, cnpj, telefone]);

            if (rows.length > 0) {
                const existingUser = rows[0];

                if (usuario === existingUser.usuario) {
                    return res.json({ success: false, message: 'Nome de usuário já cadastrado' });
                }

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

            const isPhoneValid = (value: string) => {
                const regex = /^\+\d{2} \(\d{2}\) \d{5}-\d{4}$/;
                return regex.test(value);
            };

            const isCnpjValid = (value: string) => {
                const regex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
                return regex.test(value);
            };

            if (!isPhoneValid(telefone)) {
                return res.json({ success: false, message: 'O telefone inserido está incompleto' }); 
            }

            if (!isCnpjValid(cnpj)) {
                return res.json({ success: false, message: 'O CNPJ inserido está incompleto' }); 
            }

            if (!isPhoneValid(telefone) && !isCnpjValid(cnpj)) {
                return res.json({ success: false, message: 'Campos incompletos' }); 
            }

            // Criptografar a senha
            const hashedPassword = await bcrypt.hash(senha, 10);
            dados = [usuario, email, hashedPassword, usertype, telefone, cnpj];

        } else {
            return res.status(400).json({ success: false, message: 'Caminho inválido.' });
        }


        // Inserir os dados na tabela correspondente
        const insertQuery = `
            INSERT INTO ${reqRoute} ${varsAction} VALUES ${valuesAction}
        `;
        await queryDatabase(insertQuery, dados);

        return res.json({ success: true, message: `${msgId} cadastrado/a com sucesso` });

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
//         varsAction = '(dataAgendamentoInicial, dataAgendamentoFinal, sala, status)'
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