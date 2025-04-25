import nodemailer from 'nodemailer';

export const sendEmail = async (email: string, token: string) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
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
    return null; // retorna null se não houver erro
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    return error; // retorna o erro se houver
  }
};
