import { Router } from "express";
import { Cadastro } from "../actions/userRegisterAction";
import { Login } from "../actions/userLoginAction";
import { Logout } from "../actions/userLogoutAction";
import { GetUsername } from "../actions/GetUsernameAction";

const userAuth = Router();

userAuth.post('/cadastro', Cadastro);
userAuth.post('/login', Login);
userAuth.post('/logout', Logout);
userAuth.get('/username', GetUsername);

export { userAuth }