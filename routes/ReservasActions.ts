import { Router } from "express";
import { CriarAction } from "../actions/CriarAction";
import { EditarAction } from "../actions/EditarAction";
import { VisualizarAction } from "../actions/VisualizarAction";
import { DeletarAction } from "../actions/DeletarAction";


const ReservasActions = Router();

ReservasActions.post('/', CriarAction);
ReservasActions.post('/', EditarAction);
ReservasActions.get('/', VisualizarAction);
ReservasActions.post('/', DeletarAction);

export { ReservasActions } 