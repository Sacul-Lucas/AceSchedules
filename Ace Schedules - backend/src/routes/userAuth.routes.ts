import { Router } from "express";
import { Cadastro } from "../actions/userRegisterAction";
import { Login } from "../actions/userLoginAction";
import { Logout } from "../actions/userLogoutAction";
import { GetUsername } from "../actions/GetUsernameAction";
import { GetUsertype } from "../actions/GetUserTypeAction";
import { VisualizarConfig } from "../actions/VisualizarConfig";
import { EditarConfig } from "../actions/EditarConfig";
import { CarregarDBHistorico } from "../actions/CarregarDBHistorico";
import { PasswordRecovery } from "../actions/RecuperarSenha";

const userAuth = Router();

userAuth.post('/cadastro', Cadastro);
userAuth.post('/login', Login);
userAuth.post('/password-recovery', PasswordRecovery)
userAuth.post('/logout', Logout);
userAuth.get('/username', GetUsername);
userAuth.get('/usertype', GetUsertype)
userAuth.get('/Getconfig', VisualizarConfig)
userAuth.post('/Editconfig', EditarConfig)
userAuth.get('/CarregarHistorico', CarregarDBHistorico)


export { userAuth }