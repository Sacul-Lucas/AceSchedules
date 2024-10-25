import { generateToken } from "../utils/tokenUtils"; // Função para gerar token
import { sendEmail } from "../utils/emailUtils"; // Função para enviar e-mail
// import { sendSMS } from "../utils/smsUtils"; // Função para enviar SMS
import mysql from 'mysql2/promise'; // Certifique-se de que está usando o mysql2 com suporte a promessas

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '201024',
  database: 'aceschedules',
  port: 5500
});

// Função de recuperação de senha exportada
export const PasswordRecovery = async (req, res) => {
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
    const [rows] = await pool.query(query, [value]); // Método correto para o pool do MySQL
    const user = rows[0]; // Seleciona o primeiro usuário encontrado

    if (!user) {
      return res.status(404).send('Usuário não encontrado');
    }

    // Gera o token para o usuário
    const token = generateToken(user.id);

    // Envia o token por e-mail ou SMS, dependendo do método escolhido
    if (method === 'email') {
      await sendEmail(user.email, token); // Certifique-se de que sendEmail é assíncrono
    }
    // else {
    //   await sendSMS(user.phone, token); // Certifique-se de que sendSMS é assíncrono
    // }

    res.send('Token enviado com sucesso');
  } catch (error) {
    console.error('Erro no servidor:', error);
    res.status(500).send('Erro no servidor');
  }
};