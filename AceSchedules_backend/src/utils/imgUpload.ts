import { fileURLToPath } from 'url';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// const storage = multer.diskStorage({
//   destination: (_req, _file, cb) => {
//     const uploadDir = path.resolve(__dirname, '../public/uploads/salas');
//     if (!fs.existsSync(uploadDir)) {
//       fs.mkdirSync(uploadDir, { recursive: true });
//     }
//     cb(null, uploadDir);
//   },
//   filename: (_req, file, cb) => {
//     const fileName = `${Date.now()}-${file.originalname}`;
//     cb(null, fileName);
//   },
// });

// export const upload = multer({
//   storage,
//   fileFilter: (_req, file, cb) => {
//     const ext = path.extname(file.originalname).toLowerCase();
//     if (!['.png', '.jpg', '.jpeg'].includes(ext)) {
//       return cb(new Error('Somente imagens .png, .jpg ou .jpeg são permitidas.'));
//     }
//     cb(null, true);
//   },
// });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
      const dir = path.resolve(__dirname, '../../../AceSchedules_frontend/src/assets/img_salas');
      if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
      }
      cb(null, dir);
  },
  filename: (_req, file, cb) => {
      const fileName = `${Date.now()}-${file.originalname}`;

      const filePath = path.join(__dirname, '../../../AceSchedules_frontend/src/assets/img_salas', file.originalname);

      if (fs.existsSync(filePath)) {
          return cb(new Error(`Uma imagem com este nome já existe. Por favor, renomeie a imagem.`), null);
      }

      cb(null, fileName);
  },
});

export const upload = multer({
  storage: storage,
  fileFilter: (_req, file, cb) => {
      const ext = path.extname(file.originalname).toLowerCase();
      if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
          return cb(new Error(`Somente imagens no formato .png, .jpg ou .jpeg são permitidas. Tipo enviado: ${ext}`));
      }
      cb(null, true);
  },
});
