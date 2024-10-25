import jwt from 'jsonwebtoken';

export const generateToken = (userId: string) => {
  const secretKey = process.env.JWT_SECRET || 'secret_key'; // Use uma variável de ambiente para a chave secreta
  const expiresIn = '1h'; // O token expira em 1 hora

  // Gerando o token com o ID do usuário e o tempo de expiração
  return jwt.sign({ id: userId }, secretKey, { expiresIn });
};