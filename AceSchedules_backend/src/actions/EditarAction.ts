import { Request, Response } from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { pool } from '../server';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const EditarAction = async (req: Request, res: Response) => {
    if (!req.body || !req.body.id) {
        return res.status(400).json({ success: false, message: 'Corpo da solicitação ou ID está vazio' });
    }

    const { id, statusOnly, newStatus } = req.body;
    const currPath = req.originalUrl;
    let reqRoute = '';
    let msgId = '';
    let updateFields = '';
    let dados: any[] = [];

    try {
        if (statusOnly && newStatus !== undefined) {
            reqRoute = currPath.includes('/Salas') ? 'salas' : 'reservas';
            msgId = reqRoute === 'salas' ? 'Sala' : 'Reserva';
            updateFields = 'status = ?';
            dados = [newStatus, id];
        } else {
            if (currPath.includes('/Salas')) {
                reqRoute = 'salas';
                msgId = 'Sala';
                updateFields = 'nome = ?, descricao = ?, status = ?, backImg = ?, caracteristicas = ?';

                const { nome, descricao, status = '0', caracteristicas } = req.body;
                const backImg = (req as any).file ? (req as any).file.filename : null;

                if (!nome || !descricao) {
                    return res.status(400).json({ success: false, message: 'Nome e descrição são obrigatórios.' });
                }

                if (nome.length > 40) {
                    return res.json({ success: false, message: 'O nome da sala excedeu o limite de caracteres (50)' });
                }

                let caracteristicasJson: string;
                try {
                    caracteristicasJson = JSON.stringify(caracteristicas);
                } catch (error) {
                    return res.status(400).json({ success: false, message: 'Formato das características inválido.' });
                }

                // Verifica se o nome já existe para outra sala
                const [rows]: any = await pool.query(
                    'SELECT COUNT(*) AS total FROM salas WHERE nome = ? AND id != ?',
                    [nome, id]
                );
                if (rows[0].total > 0) {
                    return res.status(400).json({ success: false, message: 'Sala já existe.' });
                }

                // Busca a imagem antiga
                const [result]: any = await pool.query('SELECT backImg FROM salas WHERE id = ?', [id]);
                const oldImage = result.length > 0 ? result[0].backImg : null;

                if (backImg && oldImage && backImg !== oldImage) {
                    const fullImagePath = path.resolve(__dirname, '../../../AceSchedules_frontend/src/assets/img_salas', oldImage);
                    try {
                        await fs.unlink(fullImagePath);
                        console.log('Imagem antiga deletada:', fullImagePath);
                    } catch (unlinkError) {
                        console.log('Erro ao deletar a imagem antiga:', unlinkError);
                    }
                }

                const imageToUse = backImg || oldImage;

                dados = [nome, descricao, status, imageToUse, caracteristicasJson, id];

            } else if (currPath.includes('/Reservas')) {
                reqRoute = 'reservas';
                msgId = 'Reserva';
                updateFields = 'dataAgendamentoInicial = ?, dataAgendamentoFinal = ?, sala = ?';

                const { salaAlocada: sala, dataAgendamentoInicial, dataAgendamentoFinal } = req.body;
                if (!dataAgendamentoInicial || !dataAgendamentoFinal || !sala) {
                    return res.json({ success: false, message: 'Campos obrigatórios faltando' });
                }

                dados = [dataAgendamentoInicial, dataAgendamentoFinal, sala, id];

                const [conflicts]: any = await pool.query(
                    `SELECT id FROM reservas WHERE dataAgendamentoInicial = ? AND dataAgendamentoFinal = ? AND sala = ? AND id != ?`,
                    [dataAgendamentoInicial, dataAgendamentoFinal, sala, id]
                );
                if (conflicts.length > 0) {
                    return res.json({ success: false, message: 'Horário já ocupado' });
                }

            } else if (currPath.includes('/Usuarios')) {
                reqRoute = 'cadastro';
                msgId = 'Usuário';
                updateFields = 'usuario = ?, email = ?, usertype = ?, telefone = ?, cnpj = ?';

                const { usuario, email, usertype, telefone, cnpj } = req.body;
                if (!usuario || !email || !usertype || !telefone || !cnpj) {
                    return res.json({ success: false, message: 'Campos obrigatórios faltando' });
                }

                if (usuario.length > 30) {
                    return res.json({ success: false, message: 'O nome de usuário não pode ter mais de 30 caracteres' });
                }

                if (email.length > 50) {
                    return res.json({ success: false, message: 'O email não pode ter mais que 50 caracteres' });
                }

                dados = [usuario, email, usertype, telefone, cnpj, id];
            } else {
                return res.status(400).json({ success: false, message: 'Caminho inválido.' });
            }
        }

        const updateQuery = `UPDATE ${reqRoute} SET ${updateFields} WHERE id = ?`;
        const [updateResult]: any = await pool.query(updateQuery, dados);

        if (updateResult.affectedRows === 0) {
            return res.json({ success: false, message: 'Nenhuma atualização feita. Verifique se o ID está correto.' });
        }

        return res.json({ success: true, message: `${msgId} atualizado(a) com sucesso` });

    } catch (error) {
        console.error('Erro no servidor:', error);
        return res.status(500).json({ success: false, message: 'Erro no servidor' });
    }
};
