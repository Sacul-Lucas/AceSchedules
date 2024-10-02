import mysql from 'mysql';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Obter o __filename e __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = path.resolve(__dirname, '../../../Ace Schedules - frontend/src/assets/img_salas');
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        const fileName = `${Date.now()}-${file.originalname}`;

        // Verificar se o arquivo com o mesmo nome já existe
        const filePath = path.join(__dirname, '../../../Ace Schedules - frontend/src/assets/img_salas', file.originalname);

        if (fs.existsSync(filePath)) {
            return cb(new Error('Uma imagem com este nome já existe. Por favor, renomeie a imagem.'));
        }

        cb(null, fileName);
    },
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
            return cb(new Error(`Somente imagens no formato .png, .jpg ou .jpeg são permitidas. Tipo enviado: ${ext}`));
        }
        cb(null, true);
    },
}).single('backImg');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '201024',
    database: 'aceschedules',
    port: 5500
});

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

    // Obtenha o tipo de usuário
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
            reqRoute = 'salas';
            msgId = 'Sala';
            varsAction = '(nome, descricao, status, backImg, caracteristicas)';
            valuesAction = '(?, ?, ?, ?, ?)';

            // Utilizar o multer para fazer o upload da imagem
            upload(req, res, async (err: any) => {
                if (err) {
                    return res.status(400).json({ success: false, message: err.message });
                }

                const { nome, descricao, status = '0', caracteristicas } = req.body;
                const backImg = (req as any).file ? (req as any).file.filename : null;

                if (!nome || !descricao || !backImg) {
                    return res.status(400).json({ success: false, message: 'Nome, descrição e imagem de fundo são obrigatórios.' });
                }

                let caracteristicasJson: string;
                try {
                    caracteristicasJson = JSON.stringify(caracteristicas);
                } catch (error) {
                    return res.status(400).json({ success: false, message: 'Formato das características inválido.' });
                }

                const checkQuery = `
                    SELECT COUNT(*) AS total FROM salas 
                    WHERE nome = ?
                `;
                dados = [nome, descricao, status, backImg, caracteristicasJson];

                const rows: any = await queryDatabase(checkQuery, [nome]);

                if (rows[0].total > 0) {
                    return res.status(400).json({ success: false, message: 'Sala já existe.' });
                }

                const insertQuery = `
                    INSERT INTO ${reqRoute} ${varsAction} VALUES ${valuesAction}
                `;
                await queryDatabase(insertQuery, dados);

                return res.json({ success: true, message: `${msgId} cadastrado/a com sucesso` });
            });

        } else if (currPath.includes('/Reservas')) {
            reqRoute = 'reservas';
            varsAction = '(usuario, dataAgendamentoInicial, dataAgendamentoFinal, sala, status)';
            valuesAction = '(?, ?, ?, ?, ?)';

            const { salaAlocada: sala, dataAgendamentoInicial, dataAgendamentoFinal } = req.body;

            if (!dataAgendamentoInicial || !dataAgendamentoFinal || !sala) {
                return res.json({ success: false, message: 'Por favor, selecione um intervalo de datas e horários válidos' });
            }

            dados = [req.session.userId, dataAgendamentoInicial, dataAgendamentoFinal, sala, isAdmin];

            const checkQuery = `
                SELECT dataAgendamentoInicial, dataAgendamentoFinal, sala FROM reservas 
                WHERE dataAgendamentoInicial = ? AND dataAgendamentoFinal = ? AND sala = ?
            `;
            const rows: any = await queryDatabase(checkQuery, [req.session.userId, dataAgendamentoInicial, dataAgendamentoFinal, sala]);

            if (rows.length > 0) {
                return res.json({ success: false, message: 'Período de agendamento já reservado' });
            }
        } else if (currPath.includes('/Usuarios')) {
            reqRoute = 'cadastro';
            msgId = 'Usuário';
            varsAction = '(usuario, email, senha, usertype, telefone, cnpj)';
            valuesAction = '(?, ?, ?, ?, ?, ?)';
            const { usuario, email, senha, usertype, telefone, cnpj } = req.body;

            if (!usuario || !email || !senha || !usertype || !telefone || !cnpj) {
                return res.json({ success: false, message: 'Campos obrigatórios faltando' });
            }

            const checkQuery = `
                SELECT usuario, email, cnpj, telefone FROM cadastro 
                WHERE usuario = ? OR email = ? OR cnpj = ? OR telefone = ?
            `;
            const rows: any = await queryDatabase(checkQuery, [usuario, email, cnpj, telefone]);

            if (rows.length > 0) {
                const existingUser = rows[0];

                if (usuario === existingUser.usuario) {
                    return res.json({ success: false, message: 'Nome de usuário já cadastrado' });
                }

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

            const isPhoneValid = (value: string) => {
                const regex = /^\+\d{2} \(\d{2}\) \d{5}-\d{4}$/;
                return regex.test(value);
            };

            const isCnpjValid = (value: string) => {
                const regex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
                return regex.test(value);
            };

            if (!isPhoneValid(telefone)) {
                return res.json({ success: false, message: 'O telefone inserido está incompleto' }); 
            }

            if (!isCnpjValid(cnpj)) {
                return res.json({ success: false, message: 'O CNPJ inserido está incompleto' }); 
            }

            const hashedPassword = await bcrypt.hash(senha, 10);
            dados = [usuario, email, hashedPassword, usertype, telefone, cnpj];
        } else {
            return res.status(400).json({ success: false, message: 'Caminho inválido.' });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Erro no servidor' });
    }
};

const getUserType = (userId: number): Promise<string> => {
    return new Promise((resolve, reject) => {
        const query = `SELECT usertype FROM cadastro WHERE id = ?`;
        pool.query(query, [userId], (error, results) => {
            if (error) {
                reject('Erro ao buscar tipo de usuário');
            } else if (results.length > 0) {
                resolve(results[0].usertype);
            } else {
                reject('Usuário não encontrado');
            }
        });
    });
};
// export const CriarAction = (req: Request, res: Response) => {
//     app.use(cors({
//         origin: 'http://localhost:5000',
//         credentials: true,
//         optionsSuccessStatus: 200
//     }));

//     if (!req.body) {
//         return res.status(400).json({ success: false, message: 'Corpo da solicitação está vazio' });
//     }

//     //INSTAVEL - Talvez precise mudar o req.route
//     const currPath = req.route;
//     let reqRoute = '';
//     let msgId = '';
//     let varsAction = '';
//     let valuesAction ='';

//     if (currPath === '/Salas/CriarAction') {
//         reqRoute = 'salas'
//         msgId = 'Sala'
//         varsAction = '(caracteristicas)'
//         valuesAction = '(:ca)'
       
//     }else if (currPath === '/Reservas/CriarAction'){
//         reqRoute = 'reservas'
//         msgId = 'Reserva'
//         varsAction = '(dataAgendamentoInicial, dataAgendamentoFinal, sala, status)'
//         valuesAction = '(:da, :ho, :sa, :st)'
//     }else{
//         reqRoute = 'cadastro'
//         msgId = 'Usuário'
//         varsAction = '(usuario, email, senha, usertype, telefone, cnpj)'
//         valuesAction = '(?, ?, ?, ?, ?, ?)';
//     }

//     const { id } = req.body;
    
//     const query = `INSERT INTO ${reqRoute} ${varsAction} VALUES ${valuesAction}`;
//     const values = [id];

//     pool.query(query, values, (error, results) => {
//         if (error) {
//             console.log(error);
//             return res.status(500).json({ success: false, message: 'Erro no servidor' });
//         }

//         if (!id) {
//             return res.json({ success: false, message: `${msgId} não foi encontrado/a` });
//         }

//         if (results.length > 0) {
//             const reserva = results[0];

//             if (id === reserva.id) {
//                 return res.json({ success: true, message: `${msgId} deletado/a com successo!` });
//             }
//         } else {
//             return res.json({ success: false, message: `Falha ao deletar ${msgId}` });
//         }
//     });
// };