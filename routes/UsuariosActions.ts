import { Router } from "express";
import { CriarAction } from "../actions/CriarAction";
import { EditarAction } from "../actions/EditarAction";
import { VisualizarAction } from "../actions/VisualizarAction";
import { DeletarAction } from "../actions/DeletarAction";

const UsuariosActions = Router();

UsuariosActions.post('/', CriarAction);
UsuariosActions.post('/', EditarAction);
UsuariosActions.get('/', VisualizarAction);
UsuariosActions.post('/', DeletarAction);


export { UsuariosActions } 