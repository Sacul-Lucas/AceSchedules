import express from 'express';
import { router } from './routes/Router';
import cors from 'cors';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import { startCronJob } from './actions/cronTask.ts';
// import dotenv from 'dotenv'; // Importando dotenv para carregar variáveis de ambiente  (npm install dotenv nodemailer twilio jsonwebtoken mysql2)

declare module 'express-session' {
  interface SessionData {
    userId: number; // ou o tipo que você está usando
  }
}

// Carregar variáveis do arquivo .env
// dotenv.config();

// Constants
// const isProduction = process.env.NODE_ENV === 'production'
const port = process.env.PORT || 5001;
// const base = process.env.BASE || '/'

const app = express();

app.use(express.json());
app.use(express.static('public'));

app.use(cors({
  origin: 'http://localhost:5000',
  credentials: true,
  optionsSuccessStatus: 200
}));

app.use(cookieParser());
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET || 'secreção', // Usando uma variável de ambiente para a secret
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 },
}));

app.use(
  express.urlencoded({
    extended: true
  })
);

app.use('/api', router);

// Iniciar o cron job
startCronJob();

// Start http server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});

export { app };