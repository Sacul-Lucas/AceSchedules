import { generateToken } from "../utils/tokenUtils"; // Função para gerar token
import { sendEmail } from "../utils/emailUtils"; // Função para enviar e-mail
import { pool } from "../server";
// import { sendSMS } from "../utils/smsUtils"; // Função para enviar SMS

// Função de recuperação de senha exportada
export const PasswordRecovery = (req, res) => {
  const { emailOrPhone, method } = req.body;

  // Consulta SQL direta para verificar se o e-mail ou telefone existe no banco de dados
  let query = '';
  let value = emailOrPhone;

  console.log(method)

  if (method === 'email') {
    query = 'SELECT * FROM cadastro WHERE email = ?';
  } else {
    query = 'SELECT * FROM cadastro WHERE phone = ?';
  }

  try {
    // Usando callback para a consulta SQL
    pool.query(query, [value], (error, rows) => {
      if (error) {
        console.error('Erro na consulta ao banco de dados:', error);
        return res.status(500).send('Erro no servidor');
      }

      const user = rows[0]; // Seleciona o primeiro usuário encontrado

      if (!user) {
        return res.status(404).send('Usuário não encontrado');
      }

      // Gera o token para o usuário
      const token = generateToken(user.id);

      // Envia o token por e-mail ou SMS, dependendo do método escolhido
      if (method === 'email') {
        sendEmail(user.email, token, (error) => {
          if (error) {
            console.error('Erro ao enviar e-mail:', error);
            return res.status(500).send('Erro ao enviar e-mail');
          }
          res.send('Token enviado com sucesso');
        });
      } else {
        // Caso tenha SMS implementado, adicione aqui
        // sendSMS(user.phone, token, (error) => {
        //   if (error) {
        //     console.error('Erro ao enviar SMS:', error);
        //     return res.status(500).send('Erro ao enviar SMS');
        //   }
        //   res.send('Token enviado com sucesso');
        // });
      }
    });
  } catch (error) {
    console.error('Erro no servidor:', error);
    res.status(500).send('Erro no servidor');
  }
};
