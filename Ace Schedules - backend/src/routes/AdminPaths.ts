import { Router } from "express";
import { ReservasActions } from './ReservasActions.routes'; 
import { SalasActions } from './SalasActions.routes'; 
import { UsuariosActions } from './UsuariosActions.routes'; 

const adminPaths = Router();

adminPaths.use('/Salas', SalasActions);
adminPaths.use('/Reservas', ReservasActions);
adminPaths.use('/Usuarios', UsuariosActions);

export { adminPaths };