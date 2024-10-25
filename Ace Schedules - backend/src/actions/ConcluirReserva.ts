import { PoolConnection } from 'mysql2';

// Função que atualiza o status das reservas automaticamente
export const concluirReservaAction = (connection: PoolConnection): void => {
  console.log("Verificando reservas...");
  const query = `
    UPDATE reservas
    SET status = 2
    WHERE dataAgendamentoFinal <= NOW() AND status = 1;
  `;

  connection.query(query, (err, result: any) => {
    if (err) {
      console.error('Erro ao atualizar reservas:', err);
    } else {
      console.log(`Reservas atualizadas: ${result.affectedRows} linha(s) modificada(s).`);
    }
  });
};