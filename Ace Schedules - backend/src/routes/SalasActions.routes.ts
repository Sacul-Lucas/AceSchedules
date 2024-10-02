import { Router } from 'express';
import { CriarAction } from '../actions/CriarAction';
import { EditarAction } from '../actions/EditarAction';
import { VisualizarAction } from '../actions/VisualizarAction';
import { DeletarAction } from '../actions/DeletarAction';
import { CarregarDB } from '../actions/CarregarDB';

const SalasActions = Router();

SalasActions.post('/Criar', CriarAction);
SalasActions.post('/Editar', EditarAction);
SalasActions.get('/Visualizar/:id', VisualizarAction);
SalasActions.post('/Deletar', DeletarAction);

SalasActions.get('/', CarregarDB); 

export { SalasActions };