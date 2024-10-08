import { Request, Response } from 'express';
import mysql from 'mysql';
import bcrypt from 'bcrypt'; // Importando o bcrypt para comparação de senhas

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

    console.log(`Verificando a autenticação do usuário... ID da sessão: ${userId}`);

    if (!userId) {
        return res.status(400).json({ success: false, message: 'ID da sessão não encontrado' });
    }

    const { usuario, email, senha, usertype, telefone, cnpj } = req.body;

    // Validação: verificar se algum campo obrigatório está faltando (exceto senha)
    if (!usuario || !email || !usertype || !telefone || !cnpj) {
        return res.json({ success: false, message: 'Campos obrigatórios faltando' });
    }

    // Validação: verificar se o 'usuario' ultrapassa 30 caracteres
    if (usuario.length > 30) {
        return res.json({ success: false, message: 'O nome de usuário não pode ter mais de 30 caracteres' });
    }

    try {
        // 1. Buscar os dados atuais do usuário no banco
        const getUserQuery = 'SELECT usuario, email, senha, telefone, cnpj FROM cadastro WHERE id = ?';
        const currentUser = await queryDatabase(getUserQuery, [userId]);

        if (!currentUser || currentUser.length === 0) {
            return res.status(404).json({ success: false, message: 'Usuário não encontrado' });
        }

        const currentData = currentUser[0];

        // 2. Comparar os outros valores para verificar se houve mudanças
        let hasChanges = (
            currentData.usuario !== usuario ||
            currentData.email !== email ||
            currentData.telefone !== telefone ||
            currentData.cnpj !== cnpj
        );

        let senhaAtualizada = false;

        // 3. Verificar se a senha foi enviada e se é diferente da atual
        if (senha) {
            const isSamePassword = await bcrypt.compare(senha, currentData.senha); // Compara a senha atual (em hash) com a nova
            if (isSamePassword) {
                return res.json({ success: false, message: 'A nova senha não pode ser igual à senha atual.' });
            }
            senhaAtualizada = true; // Marca que a senha será atualizada
            hasChanges = true; // Se a senha for diferente, houve mudanças
        }

        // 4. Se nenhum valor foi alterado, enviar mensagem ao usuário
        if (!hasChanges) {
            return res.json({ success: false, message: 'Digite as alterações desejadas' });
        }

        // 5. Montar a query de atualização de acordo com os dados fornecidos
        let updateQuery = `UPDATE cadastro SET usuario = ?, email = ?, telefone = ?, cnpj = ? WHERE id = ?`;
        const queryParams = [usuario, email, telefone, cnpj, userId];

        // 6. Se a senha será atualizada, inclui na query e no array de parâmetros
        if (senhaAtualizada) {
            const hashedPassword = await bcrypt.hash(senha, 10); // Cria o hash da nova senha
            updateQuery = `UPDATE cadastro SET usuario = ?, email = ?, senha = ?, telefone = ?, cnpj = ? WHERE id = ?`;
            queryParams.splice(2, 0, hashedPassword); // Insere o hash da senha no lugar correto dos parâmetros
        }

        // 7. Executar a query de atualização
        const result: any = await queryDatabase(updateQuery, queryParams);

        if (result.affectedRows === 0) {
            return res.json({ success: false, message: 'Nenhuma atualização feita. Verifique se o ID está correto.' });
        }

        return res.json({ success: true, message: 'Usuário atualizado(a) com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        return res.status(500).json({ success: false, message: 'Erro interno do servidor' });
    }
};