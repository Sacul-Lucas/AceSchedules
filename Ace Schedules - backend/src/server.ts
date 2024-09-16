import express from 'express'
import { router } from './routes/Router';
import cors from 'cors';
import session from 'express-session';
import cookieParser from 'cookie-parser';

// Constants
// const isProduction = process.env.NODE_ENV === 'production'
const port = process.env.PORT || 5001
// const base = process.env.BASE || '/'

const app = express();

app.use(express.json());
app.use(express.static('public'));
app.use(cors({
  origin: 'http://localhost:5000',
  credentials: true,
  optionsSuccessStatus: 200
}));

app.use(session({
  secret: 'secreção',
  saveUninitialized: true,
  cookie: { maxAge: 1000 * 60 * 60 * 24 },
}));

app.use(cookieParser());
app.use(
  express.urlencoded({
    extended: true
  })
)

app.use('/api', router);

// Start http server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`)
})

export { app };
