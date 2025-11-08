import { startCronJob } from './actions/cronTask.ts';
import { router } from './routes/Router';
import { fileURLToPath } from 'url';
import express from 'express';
import cors from 'cors';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import mysql from 'mysql2';
import MySQLStoreFactory from 'express-mysql-session';
import path from 'path';

declare module 'express-session' {
  interface SessionData {
    userId: number;
  }
}

// Carregar variáveis do arquivo .env
dotenv.config();

// Constants
const isProduction = process.env.NODE_ENV === 'production'
const port = process.env.PORT || 5001;
// const base = process.env.BASE || '/'

export const pool = mysql.createPool({
  host: isProduction ? process.env.DB_HOST : 'localhost',
  user: isProduction ? process.env.DB_USER : 'root',
  password: isProduction ? process.env.DB_PASSWORD : '201024',
  database: isProduction ? process.env.DB_NAME : 'aceschedules',
  port: Number(isProduction ? process.env.DB_PORT : 5500),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 10000
});

const MySQLStore = MySQLStoreFactory(session);

const sessionStore = new MySQLStore({
  host: isProduction ? process.env.DB_HOST : 'localhost',
  user: isProduction ? process.env.DB_USER : 'root',
  password: isProduction ? process.env.DB_PASSWORD : '201024',
  database: isProduction ? process.env.DB_NAME : 'aceschedules',
  port: Number(isProduction ? process.env.DB_PORT : 5500),
  clearExpired: true,
  checkExpirationInterval: 900000,
  expiration: 86400000
});

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = [
      'https://sacul-lucas.github.io',
      'http://localhost:5000'
    ];

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
}));

app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use(cookieParser());

app.use(session({
  secret: process.env.SESSION_SECRET || 'secreção',
  resave: false,
  saveUninitialized: true,
  store: sessionStore,
  cookie: { 
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    maxAge: 1000 * 60 * 60 * 24 
  },
}));

app.set('trust proxy', 1)

app.use(
  express.urlencoded({
    extended: true
  })
);

app.use('/api', router);

app.use('/api/uploads/salas', (req, res, next) => {
  const filePath = path.join(__dirname, '../public/uploads/salas', req.url);
  res.type(path.extname(filePath));
  express.static(path.resolve(__dirname, '../public/uploads/salas'))(req, res, next);

  res.header('Access-Control-Allow-Origin', 'https://sacul-lucas.github.io');
  res.header('Access-Control-Allow-Origin', 'http://localhost:5000');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Cross-Origin-Resource-Policy', 'cross-origin');
  // next();
}, express.static(path.resolve(__dirname, '../public/uploads/salas')));

// Iniciar o cron job
startCronJob();

// Start http server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});

export { app };