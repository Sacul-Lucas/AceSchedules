import { Router } from "express";
import { CriarAction } from "../actions/CriarAction";
import { EditarAction } from "../actions/EditarAction";
import { VisualizarAction } from "../actions/VisualizarAction";
import { DeletarAction } from "../actions/DeletarAction";

const SalasActions = Router();

SalasActions.post('/Criar', CriarAction);
SalasActions.post('/Editar', EditarAction);
SalasActions.get('/Visualizar', VisualizarAction);
SalasActions.post('/Deletar', DeletarAction);

export { SalasActions } 