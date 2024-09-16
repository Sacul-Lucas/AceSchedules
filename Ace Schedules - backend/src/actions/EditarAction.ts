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

export const EditarAction = async (req: Request, res: Response) => {
    app.use(cors({
        origin: 'http://localhost:5000',
        credentials: true,
        optionsSuccessStatus: 200
    }));

    if (!req.body || !req.body.id) {
        return res.status(400).json({ success: false, message: 'Corpo da solicitação ou ID está vazio' });
    }

    const currPath = req.route.path;
    let reqRoute = '';
    let msgId = '';
    let updateFields = '';
    let dados: any[] = [];
    const { id } = req.body; // ID necessário para atualizar o registro

    try {
        if (currPath === '/Salas/EditarAction') {
            reqRoute = 'salas';
            msgId = 'Sala';
            updateFields = 'caracteristicas = ?';

            const { caracteristicas } = req.body;

            if (!caracteristicas) {
                return res.json({ success: false, message: 'Campos obrigatórios faltando' });
            }

            dados = [caracteristicas, id]; // Os valores a serem atualizados e o ID

        } else if (currPath === '/Reservas/EditarAction') {
            reqRoute = 'reservas';
            msgId = 'Reserva';
            updateFields = 'dataAgendamento = ?, horaAgendamento = ?, sala = ?, status = ?';

            const { dataAgendamento, horaAgendamento, sala, status } = req.body;

            if (!dataAgendamento || !horaAgendamento || !sala || !status) {
                return res.json({ success: false, message: 'Campos obrigatórios faltando' });
            }

            dados = [dataAgendamento, horaAgendamento, sala, status, id];

            // Verificar duplicação de reserva (exceto a atual)
            const checkQuery = `
                SELECT id FROM reservas 
                WHERE dataAgendamento = ? AND horaAgendamento = ? AND sala = ? AND id != ?
            `;
            const rows: any = await queryDatabase(checkQuery, [dataAgendamento, horaAgendamento, sala, id]);

            if (rows.length > 0) {
                return res.json({ success: false, message: 'Horário já ocupado' });
            }

        } else { 
            reqRoute = 'cadastro';
            msgId = 'Usuário';
            updateFields = 'usuario = ?, email = ?, senha = ?, usertype = ?, telefone = ?, cnpj = ?';

            const { usuario, email, senha, usertype, telefone, cnpj } = req.body;

            if (!usuario || !email || !senha || !usertype || !telefone || !cnpj) {
                return res.json({ success: false, message: 'Campos obrigatórios faltando' });
            }

            dados = [usuario, email, senha, usertype, telefone, cnpj, id];

            // Verificar duplicação de email, telefone ou CNPJ (exceto o atual)
            const checkQuery = `
                SELECT id, email, cnpj, telefone FROM cadastro 
                WHERE (email = ? OR cnpj = ? OR telefone = ?) AND id != ?
            `;
            const rows: any = await queryDatabase(checkQuery, [email, cnpj, telefone, id]);

            if (rows.length > 0) {
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
            }
        }

        // Atualizar os dados na tabela correspondente
        const updateQuery = `
            UPDATE ${reqRoute} SET ${updateFields} WHERE id = ?
        `;
        await queryDatabase(updateQuery, dados);

        return res.json({ success: true, message: `${msgId} atualizado com sucesso` });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Erro no servidor' });
    }
};