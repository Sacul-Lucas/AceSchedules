import { Router } from "express";
import { ReservasActions } from './ReservasActions'; 
import { SalasActions } from './SalasActions'; 
import { UsuariosActions } from './UsuariosActions'; 

const adminPaths = Router();

adminPaths.use('/Salas', SalasActions);
adminPaths.use('/Reservas', ReservasActions);
adminPaths.use('/Usuarios', UsuariosActions);

export { adminPaths };