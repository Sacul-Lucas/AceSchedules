import { Router } from "express";
import { CriarAction } from "../actions/CriarAction";
import { EditarAction } from "../actions/EditarAction";
import { VisualizarAction } from "../actions/VisualizarAction";
import { DeletarAction } from "../actions/DeletarAction";
import { CarregarDB } from "../actions/CarregarDB";

const UsuariosActions = Router();

UsuariosActions.post('/Criar', CriarAction);
UsuariosActions.post('/Editar', EditarAction);
UsuariosActions.get('/Visualizar/:id', VisualizarAction);
UsuariosActions.post('/Deletar', DeletarAction);

UsuariosActions.get('/', CarregarDB); 

export { UsuariosActions };