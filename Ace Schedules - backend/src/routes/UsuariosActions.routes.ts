import { Router } from "express";
import { CriarAction } from "../actions/CriarAction";
import { EditarAction } from "../actions/EditarAction";
import { VisualizarAction } from "../actions/VisualizarAction";
import { DeletarAction } from "../actions/DeletarAction";
import { CarregarDB } from "../actions/CarregarDB";

const UsuariosActions = Router();

// Ajuste as rotas para usuários
UsuariosActions.post('/Criar', CriarAction);
UsuariosActions.post('/Editar', EditarAction);
UsuariosActions.get('/Visualizar/:id', VisualizarAction);
UsuariosActions.post('/Deletar', DeletarAction);

// Rota para carregar usuários
UsuariosActions.get('/', CarregarDB); 

export { UsuariosActions };