import { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises'; // usar a versão Promise do fs
import { pool } from '../server';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const DeletarAction = async (req: Request, res: Response) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ success: false, message: 'ID não fornecido.' });
    }

    const currPath = req.originalUrl;
    let reqRoute = '';
    let msgId = '';
    let imgColumn = '';

    try {
        if (currPath.includes('/Salas')) {
            reqRoute = 'salas';
            msgId = 'Sala';
            imgColumn = 'backImg';

            const [results] = await pool.query(`SELECT ${imgColumn} FROM ${reqRoute} WHERE id = ?`, [id]);

            if ((results as any[]).length === 0) {
                return res.status(404).json({ success: false, message: `${msgId} não encontrado(a).` });
            }

            const imagePath = (results as any[])[0][imgColumn];
            if (imagePath) {
                const fullImagePath = path.resolve(__dirname, '../../../AceSchedules_frontend/src/assets/img_salas', imagePath);

                try {
                    await fs.unlink(fullImagePath);
                    console.log('Imagem removida com sucesso:', fullImagePath);
                } catch (unlinkError) {
                    console.log('Erro ao remover a imagem:', unlinkError);
                }
            }

            await deleteFromDatabase(reqRoute, id, msgId, res);
        } else if (currPath.includes('/Reservas')) {
            reqRoute = 'reservas';
            msgId = 'Reserva';
            await deleteFromDatabase(reqRoute, id, msgId, res);
        } else if (currPath.includes('/Usuarios')) {
            reqRoute = 'cadastro';
            msgId = 'Usuário';
            await deleteFromDatabase(reqRoute, id, msgId, res);
        } else {
            return res.status(400).json({ success: false, message: 'Caminho de deleção inválido.' });
        }
    } catch (error) {
        console.error('Erro ao deletar:', error);
        res.status(500).json({ success: false, message: 'Erro interno do servidor.' });
    }
};

const deleteFromDatabase = async (reqRoute: string, id: string, msgId: string, res: Response) => {
    try {
        const [results]: any = await pool.query(`DELETE FROM ${reqRoute} WHERE id = ?`, [id]);

        if (results.affectedRows > 0) {
            return res.json({ success: true, message: `${msgId} deletada(o) com sucesso!` });
        } else {
            return res.json({ success: false, message: `Falha ao deletar ${msgId}: item não encontrado.` });
        }
    } catch (error) {
        console.error('Erro ao deletar do banco de dados:', error);
        return res.status(500).json({ success: false, message: 'Erro ao deletar do banco de dados.' });
    }
};
