import mysql from 'mysql';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '201024',
    database: 'aceschedules',
    port: 5500
});

export const Login = (req: Request, res: Response) => {
    if (!req.body) {
        return res.status(400).json({ success: false, message: 'Corpo da solicitação está vazio' });
    }

    const { email, senha, usertype } = req.body;

    const query = `SELECT * FROM cadastro WHERE (email = ? OR usuario = ?) AND usertype = ?`;
    const values = [email, email, usertype];

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

            bcrypt.compare(senha, user.senha, (err, match) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ success: false, message: 'Erro ao verificar a senha' });
                }

                if (match) {
                    req.session.userId = user.id;
                    return res.json({ success: true, message: 'Login realizado com sucesso!' });
                } else {
                    return res.json({ success: false, message: 'Email, senha e/ou tipo de usuário incorretos' });
                }
            });
        } else {
            return res.json({ success: false, message: 'Email, senha e/ou tipo de usuário incorretos' });
        }
    });
};