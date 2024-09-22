import { Router } from "express";
import { CriarAction } from "../actions/CriarAction";
import { EditarAction } from "../actions/EditarAction";
import { VisualizarAction } from "../actions/VisualizarAction";
import { DeletarAction } from "../actions/DeletarAction";
import { CarregarDB } from "../actions/CarregarDB";


const ReservasActions = Router();

// Rotas para ações de salas
ReservasActions.post('/Criar', CriarAction);
ReservasActions.post('/Editar', EditarAction);
ReservasActions.get('/Visualizar/:id', VisualizarAction);
ReservasActions.post('/Deletar', DeletarAction);

// Rota para carregar salas
ReservasActions.get('/', CarregarDB); 

export { ReservasActions } 