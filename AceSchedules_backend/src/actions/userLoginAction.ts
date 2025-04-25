import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { pool } from '../server';

export const Login = async (req: Request, res: Response) => {
    if (!req.body) {
        return res.status(400).json({ success: false, message: 'Corpo da solicitação está vazio' });
    }

    const { email, senha, usertype } = req.body;

    // Verificar se os campos obrigatórios foram preenchidos
    if (!email || !senha || !usertype) {
        return res.json({ success: false, message: 'Campos obrigatórios faltando' });
    }

    const query = `SELECT * FROM cadastro WHERE (email = ? OR usuario = ?) AND usertype = ?`;
    const values = [email, email, usertype];

    try {
        // Consultar o banco de dados
        const [results]: any = await pool.query(query, values);

        if (results.length > 0) {
            const user = results[0];

            // Verificar a senha
            const match = await bcrypt.compare(senha, user.senha);

            if (match) {
                // Se a senha for correta, salvar o id do usuário na sessão
                req.session.userId = user.id;
                return res.json({ success: true, message: 'Login realizado com sucesso!' });
            } else {
                return res.json({ success: false, message: 'Email, senha e/ou tipo de usuário incorretos' });
            }
        } else {
            return res.json({ success: false, message: 'Email, senha e/ou tipo de usuário incorretos' });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Erro no servidor' });
    }
};
