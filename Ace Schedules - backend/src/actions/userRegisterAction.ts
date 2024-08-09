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

export const Cadastro = (req: Request, res: Response) => {
    console.log('Request body:', req.body);

    app.use(cors({
        origin: 'http://localhost:5000',
        credentials: true,
        optionsSuccessStatus: 200
    }));

    if (!req.body) {
        return res.status(400).json({ success: false, message: 'Corpo da solicitação está vazio' });
    }

    const { usuario, email, senha, usertype, telefone, cnpj } = req.body;

    // Verificar se todos os campos obrigatórios foram preenchidos
    if (!usuario || !email || !senha || !usertype || !telefone || !cnpj) {
        return res.json({ success: false, message: 'Campos obrigatórios faltando' });
    }

    // Consulta para verificar se algum dos dados já existe
    const checkQuery = `
        SELECT COUNT(*) AS total FROM cadastro 
        WHERE email = ? OR cnpj = ? OR telefone = ?
    `;
    const checkValues = [email, cnpj, telefone];

    pool.query(checkQuery, checkValues, (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ success: false, message: 'Erro no servidor' });
        }

        const total = results[0]['total'];

        if (total > 0) {
            const checkDetailsQuery = `
                SELECT email, cnpj, telefone FROM cadastro 
                WHERE email = ? OR cnpj = ? OR telefone = ?
            `;
            pool.query(checkDetailsQuery, [email, cnpj, telefone], (error, rows) => {
                if (error) {
                    console.error(error);
                    return res.status(500).json({ success: false, message: 'Erro no servidor' });
                }

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
            });
        } else {
            // Inserir novo usuário
            const insertQuery = `
                INSERT INTO cadastro (usuario, email, senha, usertype, telefone, cnpj) 
                VALUES (?, ?, ?, ?, ?, ?)
            `;
            const insertValues = [usuario, email, senha, usertype, telefone, cnpj];

            pool.query(insertQuery, insertValues, (error) => {
                if (error) {
                    console.error(error);
                    return res.status(500).json({ success: false, message: 'Erro no servidor' });
                }

                return res.json({ success: true, message: 'Cadastro realizado com sucesso' });
            });
        }
    });
};