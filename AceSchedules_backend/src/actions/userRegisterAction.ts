import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { pool } from '../server';

export const Cadastro = async (req: Request, res: Response) => {
    if (!req.body) {
        return res.status(400).json({ success: false, message: 'Corpo da solicitação está vazio' });
    }

    const { usuario, email, senha, usertype, telefone, cnpj } = req.body;

    // Verificação de campos obrigatórios
    if (!usuario || !email || !senha || !usertype || !telefone || !cnpj) {
        return res.json({ success: false, message: 'Campos obrigatórios faltando' });
    }

    const checkQuery = `
        SELECT COUNT(*) AS total FROM cadastro 
        WHERE usuario = ? OR email = ? OR cnpj = ? OR telefone = ?
    `;
    const checkValues = [usuario, email, cnpj, telefone];

    try {
        // Verifica se já existe um usuário com o mesmo nome de usuário, email, telefone ou CNPJ
        const [results]: any = await pool.query(checkQuery, checkValues);
        const total = results[0]['total'];

        if (total > 0) {
            const checkDetailsQuery = `
                SELECT usuario, email, cnpj, telefone FROM cadastro 
                WHERE usuario = ? OR email = ? OR cnpj = ? OR telefone = ?
            `;
            const [rows]: any = await pool.query(checkDetailsQuery, [usuario, email, cnpj, telefone]);

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

        // Funções para validar telefone e CNPJ
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

        // Criptografando a senha
        const hashedPassword = await bcrypt.hash(senha, 10);

        // Inserir novo usuário no banco de dados
        const insertQuery = `
            INSERT INTO cadastro (usuario, email, senha, usertype, telefone, cnpj) 
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const insertValues = [usuario, email, hashedPassword, usertype, telefone, cnpj];

        await pool.query(insertQuery, insertValues);

        return res.json({ success: true, message: 'Cadastro realizado com sucesso' });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Erro no servidor' });
    }
};
