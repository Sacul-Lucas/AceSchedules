// import dotenv from 'dotenv';
// import twilio from 'twilio'; // Use import em vez de require

// // Carregar variáveis de ambiente
// dotenv.config();

// const accountSid = process.env.TWILIO_SID; // Seu Account SID
// const authToken = process.env.TWILIO_AUTH_TOKEN; // Seu Auth Token
// const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER; // Seu número registrado no Twilio

// console.log('Twilio Account SID:', accountSid);
// console.log('Twilio Auth Token:', authToken);
// console.log('Twilio Phone Number:', twilioPhoneNumber);

// // Inicializar o cliente Twilio
// const client = twilio(accountSid, authToken);

// export const sendSMS = async (phone: string, token: string) => {
//   try {
//     await client.messages.create({
//       body: `Use este link para recuperar sua senha: https://seusite.com/reset-password?token=${token}`,
//       from: twilioPhoneNumber, // Número de telefone registrado no Twilio
//       to: phone,
//     });
//     console.log('SMS enviado com sucesso');
//   } catch (error) {
//     console.error('Erro ao enviar SMS:', error);
//   }
// };