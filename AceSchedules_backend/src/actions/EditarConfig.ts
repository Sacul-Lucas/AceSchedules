import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { pool } from '../server';

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
        // Verificar os dados atuais do usuário
        const [currentUser]: any = await pool.query('SELECT usuario, email, senha, telefone, cnpj FROM cadastro WHERE id = ?', [userId]);

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

        // Verificar se a senha foi alterada
        if (senha) {
            const isSamePassword = await bcrypt.compare(senha, currentData.senha);
            if (isSamePassword) {
                errors.senha = 'A nova senha está igual à senha atual.';
            } else {
                senhaAtualizada = true;
                hasChanges = true;
            }
        }

        // Caso não tenha alterações e a senha não tenha sido fornecida
        if (!hasChanges && !senha) {
            return res.json({ success: false, message: 'Digite as alterações desejadas' });
        }

        // Verificar se o email já está em uso por outro usuário
        const [emailCheckResult]: any = await pool.query('SELECT COUNT(*) AS count FROM cadastro WHERE email = ? AND id != ?', [email, userId]);
        if (emailCheckResult[0].count > 0) {
            errors.email = 'O email já está em uso por outro usuário.';
        }

        // Se houver erros de validação, retornar
        if (Object.keys(errors).length > 0) {
            return res.json({ success: false, errors });
        }

        // Atualizar dados do usuário
        let updateQuery = 'UPDATE cadastro SET usuario = ?, email = ?, telefone = ?, cnpj = ? WHERE id = ?';
        let queryParams = [usuario, email, telefone, cnpj, userId];

        if (senhaAtualizada) {
            const hashedPassword = await bcrypt.hash(senha, 10);
            updateQuery = 'UPDATE cadastro SET usuario = ?, email = ?, senha = ?, telefone = ?, cnpj = ? WHERE id = ?';
            queryParams.splice(2, 0, hashedPassword); // Adiciona a senha criptografada no lugar correto
        }

        // Executar a consulta de atualização
        const [updateResult]: any = await pool.query(updateQuery, queryParams);

        // Verificar se houve alteração
        if (updateResult.affectedRows === 0) {
            return res.json({ success: false, message: 'Nenhuma atualização feita. Verifique se o ID está correto.' });
        }

        return res.json({ success: true, message: 'Dados atualizados com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        return res.status(500).json({ success: false, message: 'Erro interno do servidor' });
    }
};
