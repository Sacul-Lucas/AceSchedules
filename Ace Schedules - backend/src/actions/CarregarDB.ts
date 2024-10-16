import mysql from 'mysql2/promise'; 
import { Request, Response } from 'express';

// Configuração da pool de conexões MySQL
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '201024',
    database: 'aceschedules',
    port: 5500
});

export const CarregarDB = async (req: Request, res: Response) => {
    const currPath = req.originalUrl; // Use req.originalUrl para capturar o caminho completo da requisição
    let reqRoute = '';
    let sql = '';
    let sqlTotal = '';
    const params: any[] = [];

    try {
        if (currPath.includes('/Salas')) {
            const { filter_nome = '', filter_capacidade = '', apenas_bloqueadas = 'false' } = req.query;

            reqRoute = 'salas';
            sql = `SELECT id, nome, capacidade, status FROM salas WHERE 1=1`;
            sqlTotal = `SELECT COUNT(*) AS total FROM salas WHERE 1=1`;
            let sqlBloqueadas = `SELECT COUNT(*) AS bloqueadas FROM salas WHERE status = 1`;

            if (filter_nome) {
                sql += ` AND nome LIKE ?`;
                sqlTotal += ` AND nome LIKE ?`;
                sqlBloqueadas += ` AND nome LIKE ?`;
                params.push(`%${filter_nome}%`);
            }

            if (filter_capacidade) {
                sql += ` AND capacidade = ?`;
                sqlTotal += ` AND capacidade = ?`;
                sqlBloqueadas += ` AND capacidade = ?`;
                params.push(filter_capacidade);
            }

            if (apenas_bloqueadas === 'true') {
                sql += ` AND status = 1`;
                sqlTotal += ` AND status = 1`;
            }

            const connection = await pool.getConnection();
            const [rows] = await connection.query<any[]>(sql, params);
            const [totalResult] = await connection.query<any[]>(sqlTotal, params);
            const [bloqueadasResult] = await connection.query<any[]>(sqlBloqueadas, params);

            connection.release();

            const total = totalResult[0].total;
            const bloqueadas = bloqueadasResult[0].bloqueadas;

            res.json({ salas: rows, total, bloqueadas });

        } else if (currPath.includes('/Reservas')) {
            const { sala_id = '', data = '', hora = '', nome = '', status = 0 } = req.query;

            reqRoute = 'reservas';
            sql = `SELECT r.id, DATE_FORMAT(r.dataAgendamento, '%d/%m/%Y') as dataAgendamento, r.horaAgendamento, s.nome AS sala_nome, c.usuario AS usuario
                   FROM reservas r
                   JOIN salas s ON r.sala = s.id
                   JOIN cadastro c ON r.usuario = c.id
                   WHERE r.status = ?`;
            params.push(status);

            if (sala_id) {
                sql += ` AND r.sala = ?`;
                params.push(sala_id);
            }
            if (data) {
                sql += ` AND r.dataAgendamento = ?`;
                params.push(data);
            }
            if (hora) {
                sql += ` AND r.horaAgendamento = ?`;
                params.push(hora);
            }
            if (nome) {
                sql += ` AND c.usuario LIKE ?`;
                params.push(`%${nome}%`);
            }

            const connection = await pool.getConnection();
            const [rows] = await connection.query<any[]>(sql, params);

            // Contagem de reservas
            let sqlCount = `SELECT COUNT(*) AS count FROM reservas r
                            JOIN cadastro c ON r.usuario = c.id
                            WHERE r.status = ?`;

            const paramsCount: any[] = [status];

            if (sala_id) {
                sqlCount += ` AND r.sala = ?`;
                paramsCount.push(sala_id);
            }
            if (data) {
                sqlCount += ` AND r.dataAgendamento = ?`;
                paramsCount.push(data);
            }
            if (hora) {
                sqlCount += ` AND r.horaAgendamento = ?`;
                paramsCount.push(hora);
            }
            if (nome) {
                sqlCount += ` AND c.usuario LIKE ?`;
                paramsCount.push(`%${nome}%`);
            }

            const [countResult] = await connection.query<any[]>(sqlCount, paramsCount);
            connection.release();

            const count = countResult[0].count;
            res.json({ reservas: rows, count });

        } else if (currPath.includes('/Usuarios')) {
            const { user_type = '', email = '', nome = '' } = req.query;
            
            reqRoute = 'cadastro';
            sql = `SELECT * FROM cadastro WHERE 1=1`;
            sqlTotal = `SELECT COUNT(*) AS total FROM cadastro WHERE 1=1`;
        
            if (user_type && user_type !== "---Todos---") {
                sql += ` AND usertype = ?`;
                sqlTotal += ` AND usertype = ?`;
                params.push(user_type);
            }
            if (email) {
                sql += ` AND email LIKE ?`;
                sqlTotal += ` AND email LIKE ?`;
                params.push(`%${email}%`);
            }
            if (nome) {
                sql += ` AND usuario LIKE ?`;
                sqlTotal += ` AND usuario LIKE ?`;
                params.push(`%${nome}%`);
            }
        
            const connection = await pool.getConnection();
            const [rows] = await connection.query<any[]>(sql, params);
            const [totalResult] = await connection.query<any[]>(sqlTotal, params);
        
            connection.release();
        
            const total = totalResult[0]?.total ?? 0;
        
            if (rows.length === 0) { 
                res.json({ success: false, message: "Usuário não foi encontrado/a" });
            } else {
                res.json({ success: true, Usuarios: rows, total });
            }
        } else {
            res.status(400).json({ success: false, message: 'Caminho inválido.' });
        }
    } catch (err) {
        console.error('Erro ao buscar dados:', err);
        res.status(500).json({ success: false, message: 'Erro ao buscar dados.' });
    }
};



// // Função para carregar dados de "Salas"
// export const CarregarSalas = async (req: Request, res: Response) => {
//     const { filter_nome = '', filter_capacidade = '', apenas_bloqueadas = 'false' } = req.query;

//     let sql = `SELECT id, nome, capacidade, status FROM salas WHERE 1=1`;
//     let sqlTotal = `SELECT COUNT(*) AS total FROM salas WHERE 1=1`;
//     let sqlBloqueadas = `SELECT COUNT(*) AS bloqueadas FROM salas WHERE status = 1`;

//     const params: any[] = [];

//     if (filter_nome) {
//         sql += ` AND nome LIKE ?`;
//         sqlTotal += ` AND nome LIKE ?`;
//         sqlBloqueadas += ` AND nome LIKE ?`;
//         params.push(`%${filter_nome}%`);
//     }

//     if (filter_capacidade) {
//         sql += ` AND capacidade = ?`;
//         sqlTotal += ` AND capacidade = ?`;
//         sqlBloqueadas += ` AND capacidade = ?`;
//         params.push(filter_capacidade);
//     }

//     if (apenas_bloqueadas === 'true') {
//         sql += ` AND status = 1`;
//         sqlTotal += ` AND status = 1`;
//     }

//     try {
//         const connection = await pool.getConnection();

//         const [rows] = await connection.query(sql, params);
//         const [totalResult] = await connection.query(sqlTotal, params);
//         const [bloqueadasResult] = await connection.query(sqlBloqueadas, params);

//         connection.release();

//         const total = totalResult[0].total;
//         const bloqueadas = bloqueadasResult[0].bloqueadas;

//         res.json({ salas: rows, total, bloqueadas });
//     } catch (err) {
//         console.error('Erro ao buscar dados:', err);
//         res.status(500).send('Erro ao buscar dados.');
//     }
// };

// // Função para carregar dados de "Reservas"
// export const CarregarReservas = async (req: Request, res: Response) => {
//     const { sala_id = '', data = '', hora = '', nome = '', status = 0 } = req.query;

//     let sql = `SELECT r.id, DATE_FORMAT(r.dataAgendamento, '%d/%m/%Y') as dataAgendamento, r.horaAgendamento, s.nome AS sala_nome, c.usuario AS usuario
//                FROM reservas r
//                JOIN salas s ON r.sala = s.id
//                JOIN cadastro c ON r.usuario = c.id
//                WHERE r.status = ?`;

//     const params: any[] = [status];

//     if (sala_id) {
//         sql += ` AND r.sala = ?`;
//         params.push(sala_id);
//     }
//     if (data) {
//         sql += ` AND r.dataAgendamento = ?`;
//         params.push(data);
//     }
//     if (hora) {
//         sql += ` AND r.horaAgendamento = ?`;
//         params.push(hora);
//     }
//     if (nome) {
//         sql += ` AND c.usuario LIKE ?`;
//         params.push(`%${nome}%`);
//     }

//     try {
//         const connection = await pool.getConnection();

//         const [rows] = await connection.query(sql, params);

//         // Contagem de reservas
//         let sqlCount = `SELECT COUNT(*) AS count FROM reservas r
//                         JOIN cadastro c ON r.usuario = c.id
//                         WHERE r.status = ?`;

//         const paramsCount: any[] = [status];

//         if (sala_id) {
//             sqlCount += ` AND r.sala = ?`;
//             paramsCount.push(sala_id);
//         }
//         if (data) {
//             sqlCount += ` AND r.dataAgendamento = ?`;
//             paramsCount.push(data);
//         }
//         if (hora) {
//             sqlCount += ` AND r.horaAgendamento = ?`;
//             paramsCount.push(hora);
//         }
//         if (nome) {
//             sqlCount += ` AND c.usuario LIKE ?`;
//             paramsCount.push(`%${nome}%`);
//         }

//         const [countResult] = await connection.query(sqlCount, paramsCount);

//         connection.release();

//         const count = countResult[0].count;

//         res.json({ reservas: rows, count });
//     } catch (err) {
//         console.error('Erro ao buscar reservas:', err);
//         res.status(500).send('Erro ao buscar reservas.');
//     }
// };

// // Função para carregar dados de "Cadastro"
// export const CarregarUsuarios = async (req: Request, res: Response) => {
//     const { user_type = '', email = '', nome = '' } = req.query;

//     let sql = `SELECT id, usuario, email, senha, usertype FROM cadastro WHERE 1=1`;
//     let sqlTotal = `SELECT COUNT(*) AS total FROM cadastro WHERE 1=1`;

//     const params: any[] = [];

//     if (user_type && user_type !== "---Todos---") {
//         sql += ` AND usertype = ?`;
//         sqlTotal += ` AND usertype = ?`;
//         params.push(user_type);
//     }
//     if (email) {
//         sql += ` AND email LIKE ?`;
//         sqlTotal += ` AND email LIKE ?`;
//         params.push(`%${email}%`);
//     }
//     if (nome) {
//         sql += ` AND usuario LIKE ?`;
//         sqlTotal += ` AND usuario LIKE ?`;
//         params.push(`%${nome}%`);
//     }

//     try {
//         const connection = await pool.getConnection();

//         const [rows] = await connection.query(sql, params);
//         const [totalResult] = await connection.query(sqlTotal, params);

//         connection.release();

//         const total = totalResult[0].total;

//         res.json({ Usuarios: rows, total });
//     } catch (err) {
//         console.error('Erro ao buscar Usuarios:', err);
//         res.status(500).send('Erro ao buscar Usuarios.');
//     }
// };



// const { filter_nome = '', filter_capacidade = '', apenas_bloqueadas = 'false' } = req.query;

// let sql = `SELECT * FROM ${reqRoute} WHERE 1=1`;
// let sqlTotal = `SELECT COUNT(*) AS total FROM ${reqRoute} WHERE 1=1`;
// let sqlTotalAprov = `SELECT COUNT(*) AS total FROM reservas WHERE 1=1`;
// let sqlBloqueadas = `SELECT COUNT(*) AS bloqueadas FROM salas WHERE status = 1`;


// const params: any[] = [];

// if (filter_nome) {
//     sql += ` AND nome LIKE ?`;
//     sqlTotal += ` AND nome LIKE ?`;
//     sqlBloqueadas += ` AND nome LIKE ?`;
//     params.push(`%${filter_nome}%`);
// }

// if (filter_capacidade) {
//     sql += ` AND capacidade = ?`;
//     sqlTotal += ` AND capacidade = ?`;
//     sqlBloqueadas += ` AND capacidade = ?`;
//     params.push(filter_capacidade);
// }

// if (apenas_bloqueadas === 'true') {
//     sql += ` AND status = 1`;
//     sqlTotal += ` AND status = 1`;
// }