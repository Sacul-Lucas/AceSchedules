import mysql from 'mysql';
import { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Obtenha o diretório atual usando import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '201024',
    database: 'aceschedules',
    port: 5500
});

export const DeletarAction = (req: Request, res: Response) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ success: false, message: 'ID não fornecido.' });
    }

    const currPath = req.originalUrl;
    let reqRoute = '';
    let msgId = '';
    let imgColumn = ''; // Coluna de imagem, se aplicável

    if (currPath.includes('/Salas')) {
        reqRoute = 'salas';
        msgId = 'Sala';
        imgColumn = 'backImg'; // Coluna da imagem no banco de dados

        // Primeiro, buscar a imagem associada à sala antes de deletar
        const selectQuery = `SELECT ${imgColumn} FROM ${reqRoute} WHERE id = ?`;
        pool.query(selectQuery, [id], (error, results) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ success: false, message: 'Erro ao buscar a imagem.' });
            }

            if (results.length === 0) {
                return res.status(404).json({ success: false, message: `${msgId} não encontrado(a).` });
            }

            const imagePath = results[0][imgColumn];
            if (imagePath) {
                // Caminho completo da imagem no sistema de arquivos
                const fullImagePath = path.resolve(__dirname, '../../../Ace Schedules - frontend/src/assets/img_salas', imagePath);

                // Remover a imagem do sistema de arquivos
                fs.unlink(fullImagePath, (unlinkError) => {
                    if (unlinkError) {
                        console.log('Erro ao remover a imagem:', unlinkError);
                    } else {
                        console.log('Imagem removida com sucesso:', fullImagePath);
                    }

                    // Depois de tentar remover a imagem, deletar o registro do banco de dados
                    deleteFromDatabase(reqRoute, id, msgId, res);
                });
            } else {
                // Se não houver imagem, proceder diretamente para a deleção do registro
                deleteFromDatabase(reqRoute, id, msgId, res);
            }
        });
    } else if (currPath.includes('/Reservas')) {
        reqRoute = 'reservas';
        msgId = 'Reserva';
        deleteFromDatabase(reqRoute, id, msgId, res); // Sem unlink para imagens
    } else if (currPath.includes('/Usuarios')) {
        reqRoute = 'cadastro'; 
        msgId = 'Usuário';
        deleteFromDatabase(reqRoute, id, msgId, res); // Sem unlink para imagens
    } else {
        return res.status(400).json({ success: false, message: 'Caminho de deleção inválido.' });
    }
};

// Função auxiliar para deletar o registro no banco de dados
const deleteFromDatabase = (reqRoute: string, id: string, msgId: string, res: Response) => {
    const deleteQuery = `DELETE FROM ${reqRoute} WHERE id = ?`;
    const values = [id];

    pool.query(deleteQuery, values, (error, results) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: 'Erro no servidor' });
        }

        if (results.affectedRows > 0) {
            return res.json({ success: true, message: `${msgId} deletado(a) com sucesso!` });
        } else {
            return res.json({ success: false, message: `Falha ao deletar ${msgId}: item não encontrado.` });
        }
    });
};