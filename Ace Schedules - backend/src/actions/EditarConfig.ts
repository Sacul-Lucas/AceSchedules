import { Request, Response } from 'express';
import mysql from 'mysql';
import bcrypt from 'bcrypt';

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '201024',
    database: 'aceschedules',
    port: 5500
});

function queryDatabase(query: string, params: any[]): Promise<any> {
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

export const EditarConfig = async (req: Request, res: Response) => {
    const userId = req.session?.userId;

    if (!userId) {
        return res.status(400).json({ success: false, message: 'ID da sessão não encontrado' });
    }

    const { usuario, email, senha, telefone, cnpj } = req.body;

    const errors: Record<string, string> = {};

    // Validação: verificar se algum campo obrigatório está faltando
    if (!usuario) errors.usuario = 'Campo obrigatório faltando';
    if (!email) errors.email = 'Campo obrigatório faltando';
    if (!telefone) errors.telefone = 'Campo obrigatório faltando';
    if (!cnpj) errors.cnpj = 'Campo obrigatório faltando';

    if (usuario && usuario.length > 30) {
        errors.usuario = 'O nome não pode ter mais que 30 caracteres';
    }

    if (email && email.length > 50) {
        errors.email = 'O email não pode ter mais que 50 caracteres';
    }

    try {
        const getUserQuery = 'SELECT usuario, email, senha, telefone, cnpj FROM cadastro WHERE id = ?';
        const currentUser = await queryDatabase(getUserQuery, [userId]);

        if (!currentUser || currentUser.length === 0) {
            return res.status(404).json({ success: false, message: 'Usuário não encontrado' });
        }

        const currentData = currentUser[0];

        let hasChanges = (
            currentData.usuario !== usuario ||
            currentData.email !== email ||
            currentData.telefone !== telefone ||
            currentData.cnpj !== cnpj
        );

        let senhaAtualizada = false;

        if (senha) {
            const isSamePassword = await bcrypt.compare(senha, currentData.senha);
            if (isSamePassword) {
                errors.senha = 'A nova senha está igual à senha atual.';
            } else {
                senhaAtualizada = true;
                hasChanges = true;
            }
        }

        if (!hasChanges && !senha) {
            return res.json({ success: false, message: 'Digite as alterações desejadas' });
        }

        const emailCheckQuery = 'SELECT COUNT(*) AS count FROM cadastro WHERE email = ? AND id != ?';
        const emailCheckResult = await queryDatabase(emailCheckQuery, [email, userId]);
        if (emailCheckResult[0].count > 0) {
            errors.email = 'O email já está em uso por outro usuário.';
        }

        if (Object.keys(errors).length > 0) {
            return res.json({ success: false, errors });
        }

        let updateQuery = 'UPDATE cadastro SET usuario = ?, email = ?, telefone = ?, cnpj = ? WHERE id = ?';
        const queryParams = [usuario, email, telefone, cnpj, userId];

        if (senhaAtualizada) {
            const hashedPassword = await bcrypt.hash(senha, 10);
            updateQuery = 'UPDATE cadastro SET usuario = ?, email = ?, senha = ?, telefone = ?, cnpj = ? WHERE id = ?';
            queryParams.splice(2, 0, hashedPassword);
        }

        const result: any = await queryDatabase(updateQuery, queryParams);

        if (result.affectedRows === 0) {
            return res.json({ success: false, message: 'Nenhuma atualização feita. Verifique se o ID está correto.' });
        }

        return res.json({ success: true, message: 'Dados atualizados com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        return res.status(500).json({ success: false, message: 'Erro interno do servidor' });
    }
};