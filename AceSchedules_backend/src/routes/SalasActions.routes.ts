import { Router } from 'express';
import { CriarAction } from '../actions/CriarAction';
import { EditarAction } from '../actions/EditarAction';
import { VisualizarAction } from '../actions/VisualizarAction';
import { DeletarAction } from '../actions/DeletarAction';
import { CarregarDB } from '../actions/CarregarDB';
import { upload } from '../utils/imgUpload';

const SalasActions = Router();

SalasActions.post('/Criar', upload.single('backImg'), CriarAction);
SalasActions.post('/Editar', upload.single('backImg'), EditarAction);
SalasActions.get('/Visualizar/:id', VisualizarAction);
SalasActions.post('/Deletar', DeletarAction);

SalasActions.get('/', CarregarDB); 

export { SalasActions };