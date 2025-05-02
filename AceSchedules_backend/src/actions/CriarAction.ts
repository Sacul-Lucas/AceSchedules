import { Request, Response } from 'express';
import { pool } from '../server';
import bcrypt from 'bcrypt';

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
    if (!req.body) {
        return res.status(400).json({ success: false, message: 'Corpo da solicitação está vazio' });
    }

    if (!req.session || !req.session.userId) {
        return res.status(401).json({ success: false, message: 'Usuário não autenticado' });
    }

    const usertype = await getUserType(req.session.userId);
    const isAdmin = usertype === 'admin';

    const currPath = req.originalUrl;
    let reqRoute = '';
    let msgId = '';
    let varsAction = '';
    let valuesAction = '';
    let dados: any[] = [];

    try {
        if (currPath.includes('/Salas')) {
            console.log('Rota de salas chamada');

            reqRoute = 'salas';
            msgId = 'Sala';
            varsAction = '(nome, descricao, status, backImg, caracteristicas)';
            valuesAction = '(?, ?, ?, ?, ?)';

            const { nome, descricao, status = '0', caracteristicas } = req.body;
            const backImg = req.file ? req.file.filename : null;

            if (!nome || !descricao || !backImg) {
                return res.status(400).json({ success: false, message: 'Nome, descrição e imagem de fundo são obrigatórios.' });
            }
            if (nome.length > 40) {
                return res.json({ success: false, message: 'O nome da sala excedeu o limite de caracteres (50)' });
            }

            let caracteristicasJson: string;
            try {
                caracteristicasJson = JSON.stringify(caracteristicas);
            } catch {
                return res.status(400).json({ success: false, message: 'Formato das características inválido.' });
            }

            const checkQuery = `SELECT COUNT(*) AS total FROM salas WHERE nome = ?`;
            dados = [nome, descricao, status, backImg, caracteristicasJson];

            const rows: any = await queryDatabase(checkQuery, [nome]);
            if (rows[0].total > 0) {
                return res.status(400).json({ success: false, message: 'Sala já existe.' });
            }

            const insertQuery = `INSERT INTO ${reqRoute} ${varsAction} VALUES ${valuesAction}`;
            await queryDatabase(insertQuery, dados);

            return res.json({ success: true, message: `${msgId} cadastrado/a com sucesso` });
        }

        // Reservas
        else if (currPath.includes('/Reservas')) {
            reqRoute = 'reservas';
            varsAction = '(usuario, dataAgendamentoInicial, dataAgendamentoFinal, sala, status)';
            valuesAction = '(?, ?, ?, ?, 1)';

            const { salaAlocada: sala, dataAgendamentoInicial, dataAgendamentoFinal } = req.body;
            if (!dataAgendamentoInicial || !dataAgendamentoFinal || new Date(dataAgendamentoInicial) >= new Date(dataAgendamentoFinal) || !sala) {
                return res.json({ success: false, message: 'Por favor, selecione um intervalo de datas e horários válidos.' });
            }

            dados = [req.session.userId, dataAgendamentoInicial, dataAgendamentoFinal, sala, isAdmin];

            const checkQuery = `
                SELECT * FROM reservas 
                WHERE sala = ?
                AND (
                    (dataAgendamentoInicial <= ? AND dataAgendamentoFinal > ?) OR
                    (dataAgendamentoInicial < ? AND dataAgendamentoFinal >= ?) OR
                    (dataAgendamentoInicial >= ? AND dataAgendamentoFinal <= ?)
                )
            `;
            const rows: any = await queryDatabase(checkQuery, [
                sala,
                dataAgendamentoInicial, dataAgendamentoInicial,
                dataAgendamentoFinal, dataAgendamentoFinal,
                dataAgendamentoInicial, dataAgendamentoFinal
            ]);

            if (rows.length > 0) {
                return res.json({ success: false, message: 'Já existe uma reserva que conflita com o período selecionado' });
            }

            const insertQuery = `INSERT INTO ${reqRoute} ${varsAction} VALUES ${valuesAction}`;
            await queryDatabase(insertQuery, dados);
            return res.json({ success: true, message: `Reserva efetuada com sucesso` });
        }

        // Usuários
        else if (currPath.includes('/Usuarios')) {
            reqRoute = 'cadastro';
            msgId = 'Usuário';
            varsAction = '(usuario, email, senha, usertype, telefone, cnpj)';
            valuesAction = '(?, ?, ?, ?, ?, ?)';

            const { usuario, email, senha, usertype, telefone, cnpj } = req.body;
            if (!usuario || !email || !senha || !usertype || !telefone || !cnpj) {
                return res.json({ success: false, message: 'Campos obrigatórios faltando' });
            }

            const checkQuery = `SELECT usuario, email, cnpj, telefone FROM cadastro WHERE usuario = ? OR email = ? OR cnpj = ? OR telefone = ?`;
            const rows: any = await queryDatabase(checkQuery, [usuario, email, cnpj, telefone]);

            if (rows.length > 0) {
                const existingUser = rows[0];
                if (usuario === existingUser.usuario) return res.json({ success: false, message: 'Nome de usuário já cadastrado' });
                if (email === existingUser.email) return res.json({ success: false, message: 'Email já cadastrado' });
                if (cnpj === existingUser.cnpj) return res.json({ success: false, message: 'CNPJ já cadastrado' });
                if (telefone === existingUser.telefone) return res.json({ success: false, message: 'Telefone já cadastrado' });
            }

            const isPhoneValid = (value: string) => /^\+\d{2} \(\d{2}\) \d{5}-\d{4}$/.test(value);
            const isCnpjValid = (value: string) => /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/.test(value);

            if (!isPhoneValid(telefone)) return res.json({ success: false, message: 'O telefone inserido está incompleto' });
            if (!isCnpjValid(cnpj)) return res.json({ success: false, message: 'O CNPJ inserido está incompleto' });
            if (usuario.length > 30) return res.json({ success: false, message: 'O nome de usuário não pode ter mais de 30 caracteres' });
            if (email.length > 50) return res.json({ success: false, message: 'O email não pode ter mais que 50 caracteres' });

            const hashedPassword = await bcrypt.hash(senha, 10);
            dados = [usuario, email, hashedPassword, usertype, telefone, cnpj];

            const insertQuery = `INSERT INTO ${reqRoute} ${varsAction} VALUES ${valuesAction}`;
            await queryDatabase(insertQuery, dados);

            return res.json({ success: true, message: `${msgId} cadastrado/a com sucesso` });
        }

        // Rota não reconhecida
        else {
            return res.status(404).json({ success: false, message: 'Rota não encontrada' });
        }
    } catch (error) {
        console.error('Erro ao processar a solicitação:', error);
        return res.status(500).json({ success: false, message: 'Erro interno do servidor' });
    }
};

const getUserType = async (userId: number) => {
    const query = 'SELECT usertype FROM cadastro WHERE id = ?';
    const result = await queryDatabase(query, [userId]);
    return result[0]?.usertype;
};
