import mysql from 'mysql';
import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Configurar o caminho correto no ES module
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

interface QueryResult {
    affectedRows: number;
}

// Função auxiliar para realizar consultas ao banco de dados
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

// Função auxiliar para buscar a imagem antiga antes da edição
function getOldImage(salaId: string): Promise<string | null> {
    return new Promise((resolve, reject) => {
        const query = 'SELECT backImg FROM salas WHERE id = ?';
        pool.query(query, [salaId], (error, results) => {
            if (error) {
                return reject(error);
            }
            if (results.length > 0 && results[0].backImg) {
                resolve(results[0].backImg);
            } else {
                resolve(null);
            }
        });
    });
}

// Função auxiliar para deletar uma imagem antiga do sistema de arquivos
function deleteOldImage(imagePath: string) {
    const fullImagePath = path.resolve(__dirname, '../../../Ace Schedules - frontend/src/assets/img_salas', imagePath);
    fs.unlink(fullImagePath, (error) => {
        if (error) {
            console.log('Erro ao deletar a imagem antiga:', error);
        } else {
            console.log('Imagem antiga deletada com sucesso:', fullImagePath);
        }
    });
}

export const EditarAction = async (req: Request, res: Response) => {
    if (!req.body || !req.body.id) {
        return res.status(400).json({ success: false, message: 'Corpo da solicitação ou ID está vazio' });
    }

    const { id, statusOnly, newStatus } = req.body;
    const currPath = req.originalUrl; 
    let reqRoute = '';
    let msgId = '';
    let updateFields = '';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
                const { nome, descricao, status = '0', backImg, caracteristicas } = req.body;

                if (!nome || !descricao) {
                    return res.status(400).json({ success: false, message: 'Nome e descrição são obrigatórios.' });
                }

                // Adicionando log para verificar se a imagem está sendo recebida
                console.log('Imagem recebida (backImg):', backImg);

                let caracteristicasJson: string;
                try {
                    caracteristicasJson = JSON.stringify(caracteristicas);
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                } catch (error) {
                    return res.status(400).json({ success: false, message: 'Formato das características inválido.' });
                }

                dados = [nome, descricao, status, backImg, caracteristicasJson, id];

                // Verificar se o nome da sala já existe
                const checkQuery = `SELECT COUNT(*) AS total FROM salas WHERE nome = ? AND id != ?`;
                const rows: any = await queryDatabase(checkQuery, [nome, id]);

                if (rows[0].total > 0) {
                    return res.status(400).json({ success: false, message: 'Sala já existe.' });
                }

                // Buscar a imagem antiga antes de fazer a atualização
                const oldImage = await getOldImage(id);

                if (backImg && oldImage !== backImg) {
                    // Se há uma nova imagem, deletar a antiga
                    if (oldImage) {
                        deleteOldImage(oldImage);
                    }
                } else {
                    // Se não há uma nova imagem, manter a imagem antiga
                    dados[3] = oldImage;
                }

            } else if (currPath.includes('/Reservas')) {
                reqRoute = 'reservas';
                msgId = 'Reserva';
                updateFields = 'dataAgendamentoInicial = ?, dataAgendamentoFinal = ?, sala = ?';
                const { salaAlocada: sala, dataAgendamentoInicial, dataAgendamentoFinal } = req.body;
                if (!dataAgendamentoInicial || !dataAgendamentoFinal || !sala) {
                    return res.json({ success: false, message: 'Campos obrigatórios faltando' });
                }
                dados = [dataAgendamentoInicial, dataAgendamentoFinal, sala, id];

                const checkQuery = `SELECT id FROM reservas WHERE dataAgendamentoInicial = ? AND dataAgendamentoFinal = ? AND sala = ? AND id != ?`;
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
                    return res.json({ success: false, message: 'Campos obrigatórios faltando' });
                }
                dados = [usuario, email, senha, usertype, telefone, cnpj, id];
            } else {
                return res.status(400).json({ success: false, message: 'Caminho inválido.' });
            }
        }

        // Executar a atualização no banco de dados
        const updateQuery = `UPDATE ${reqRoute} SET ${updateFields} WHERE id = ?`;
        const result: QueryResult = await queryDatabase(updateQuery, dados);

        if (result.affectedRows === 0) {
            return res.json({ success: false, message: 'Nenhuma atualização feita. Verifique se o ID está correto.' });
        }

        return res.json({ success: true, message: `${msgId} atualizado(a) com sucesso` });

    } catch (error) {
        console.error('Erro no servidor:', error);
        return res.status(500).json({ success: false, message: 'Erro no servidor' });
    }
};