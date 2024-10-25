import cron from 'node-cron';
import mysql, { Pool } from 'mysql2';
import { concluirReservaAction } from './ConcluirReserva';

// Criação do pool de conexões
const pool: Pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '201024',
  database: 'aceschedules',
  port: 5500
});

// Agendamento da cron job (executa a cada minuto)
export const startCronJob = () => {
  cron.schedule('* * * * *', () => {
    console.log('Executando tarefa cron para atualizar reservas...');
    
    // Usa o pool para pegar uma conexão
    pool.getConnection((err, connection) => {
      if (err) {
        console.error('Erro ao obter conexão do pool:', err);
        return;
      }
      
      concluirReservaAction(connection);

      // Libera a conexão de volta para o pool
      connection.release();
    });
  });
};