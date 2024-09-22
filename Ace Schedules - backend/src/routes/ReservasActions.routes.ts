import { Router } from "express";
import { CriarAction } from "../actions/CriarAction";
import { EditarAction } from "../actions/EditarAction";
import { VisualizarAction } from "../actions/VisualizarAction";
import { DeletarAction } from "../actions/DeletarAction";
import { CarregarDB } from "../actions/CarregarDB";


const ReservasActions = Router();

// Rotas para ações de salas
ReservasActions.post('/', CriarAction);
ReservasActions.post('/', EditarAction);
ReservasActions.get('/', VisualizarAction);
ReservasActions.post('/', DeletarAction);

// Rota para carregar salas
ReservasActions.get('/', CarregarDB); 

export { ReservasActions } 