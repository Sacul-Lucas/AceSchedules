import mysql from 'mysql';
import { Request, Response } from 'express';
import { app } from '../server';
import cors from 'cors';
import session from 'express-session';
import cookieParser from 'cookie-parser';

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '201024',
    database: 'aceschedules',
    port: 5500
});

export const Login = (req: Request, res: Response) => {
    console.log('Request body:', req.body);

    app.use(cors({
        origin: 'http://localhost:5000',
        credentials: true,
        optionsSuccessStatus: 200
    }));

    app.use(session({
        secret: 'secreção',
        saveUninitialized: true,
        cookie: { maxAge: 1000 * 60 * 60 * 24 },
    }));

    app.use(cookieParser());

    if (!req.body) {
        return res.status(400).json({ success: false, message: 'Corpo da solicitação está vazio' });
    }

    const { email, senha, usertype } = req.body;

    const query = `SELECT * FROM cadastro WHERE (email = ? OR usuario = ?) AND senha = ? AND usertype = ?`;
    const values = [email, email, senha, usertype];

    pool.query(query, values, (error, results) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: 'Erro no servidor' });
        }

        if (!email || !senha || !usertype) {
            return res.json({ success: false, message: 'Campos obrigatórios faltando' });
        }

        if (results.length > 0) {
            const user = results[0];

            if (senha === user.senha && (email === user.email || email === user.usuario) && usertype === user.usertype) {
                return res.json({ success: true, message: 'Login realizado com successo!' });
            }
        } else {
            return res.json({ success: false, message: 'Email, senha e/ou tipo de usuário incorretos' });
        }
    });
};