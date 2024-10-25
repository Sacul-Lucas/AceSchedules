import nodemailer from 'nodemailer';

export const sendEmail = async (email: string, token: string) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Ou o serviço de e-mail que você usa
    auth: {
      user: process.env.EMAIL_USER, // Seu e-mail
      pass: process.env.EMAIL_PASSWORD, // Sua senha ou chave de aplicativo
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Recuperação de Senha',
    text: `Use este link para recuperar sua senha: https://seusite.com/reset-password?token=${token}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('E-mail enviado com sucesso');
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
  }
};