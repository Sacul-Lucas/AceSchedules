import mysql from 'mysql';
import { Request, Response } from 'express';

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '201024',
    database: 'aceschedules',
    port: 5500
});

interface QueryResult {
    affectedRows: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function queryDatabase(query: string, params: any[]): Promise<QueryResult> {
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
    if (!req.body || !req.body.id) {
        return res.status(400).json({ success: false, message: 'Corpo da solicitação ou ID está vazio' });
    }

    const { id, statusOnly, newStatus } = req.body; // Adicionando campo statusOnly
    const currPath = req.originalUrl; 
    let reqRoute = '';
    let msgId = '';
    let updateFields = '';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let dados: any[] = [];

    try {
        if (statusOnly && newStatus !== undefined) {
            // Se statusOnly for true, apenas atualiza o status
            reqRoute = currPath.includes('/Salas') ? 'salas' : 'reservas';
            msgId = reqRoute === 'salas' ? 'Sala' : 'Reserva';
            updateFields = 'status = ?';
            dados = [newStatus, id];
        } else {
            // Lógica de edição normal
            if (currPath.includes('/Salas')) {
                reqRoute = 'salas';
                msgId = 'Sala';
                updateFields = 'caracteristicas = ?';
                const { caracteristicas } = req.body;
                if (!caracteristicas) {
                    return res.json({ success: false, message: 'Campos obrigatórios faltando salas' });
                }
                dados = [caracteristicas, id];

            } else if (currPath.includes('/Reservas')) {
                reqRoute = 'reservas';
                msgId = 'Reserva';
                updateFields = 'dataAgendamentoInicial = ?, dataAgendamentoFinal = ?, sala = ?';
                const { salaAlocada: sala, dataAgendamentoInicial, dataAgendamentoFinal } = req.body;
                if (!dataAgendamentoInicial || !dataAgendamentoFinal || !sala) {
                    return res.json({ success: false, message: 'Campos obrigatórios faltando' });
                }
                dados = [dataAgendamentoInicial, dataAgendamentoFinal, sala, id];

                const checkQuery = `
                    SELECT id FROM reservas 
                    WHERE dataAgendamentoInicial = ? AND dataAgendamentoFinal = ? AND sala = ? AND id != ?
                `;
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const rows: any = await queryDatabase(checkQuery, [dataAgendamentoInicial, dataAgendamentoFinal, sala, id]);
                if (rows.length > 0) {
                    return res.json({ success: false, message: 'Horário já ocupado' });
                }

            } else if (currPath.includes('/Usuarios')) { 
                reqRoute = 'cadastro';
                msgId = 'Usuário';
                updateFields = 'usuario = ?, email = ?, senha = ?, usertype = ?, telefone = ?, cnpj = ?';
                const { usuario, email, senha, usertype, telefone, cnpj } = req.body;
                if (!usuario || !email || !senha || !usertype || !telefone || !cnpj) {
                    return res.json({ success: false, message: 'Campos obrigatórios faltando users' });
                }
                dados = [usuario, email, senha, usertype, telefone, cnpj, id];
            } else {
                return res.status(400).json({ success: false, message: 'Caminho inválido.' });
            }
        }

        const updateQuery = `
            UPDATE ${reqRoute} SET ${updateFields} WHERE id = ?
        `;

        const result: QueryResult = await queryDatabase(updateQuery, dados);

        if (result.affectedRows === 0) {
            return res.json({ success: false, message: 'Nenhuma atualização feita. Verifique se o ID está correto.' });
        }

        return res.json({ success: true, message: `${msgId} atualizado/a com sucesso` });

    } catch (error) {
        console.error('Erro no servidor:', error);
        return res.status(500).json({ success: false, message: 'Erro no servidor' });
    }
};