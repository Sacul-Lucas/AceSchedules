import { Router } from 'express';
import { CriarAction } from '../actions/CriarAction';
import { EditarAction } from '../actions/EditarAction';
import { VisualizarAction } from '../actions/VisualizarAction';
import { DeletarAction } from '../actions/DeletarAction';
import { CarregarDB } from '../actions/CarregarDB';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const SalasActions = Router();

// Configurar o caminho correto no ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = path.resolve(__dirname, '../../../Ace Schedules - frontend/src/assets/img_salas');
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        const fileName = `${Date.now()}-${file.originalname}`;

        const filePath = path.join(__dirname, '../../../Ace Schedules - frontend/src/assets/img_salas', file.originalname);

        if (fs.existsSync(filePath)) {
            return cb(new Error(`Uma imagem com este nome já existe. Por favor, renomeie a imagem.`), null);
        }

        cb(null, fileName);
    },
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
            return cb(new Error(`Somente imagens no formato .png, .jpg ou .jpeg são permitidas. Tipo enviado: ${ext}`));
        }
        cb(null, true);
    },
});

SalasActions.post('/Criar', CriarAction);
SalasActions.post('/Editar', upload.single('backImg'), EditarAction);
SalasActions.get('/Visualizar/:id', VisualizarAction);
SalasActions.post('/Deletar', DeletarAction);

SalasActions.get('/', CarregarDB); 

export { SalasActions };