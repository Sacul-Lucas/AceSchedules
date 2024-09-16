import { Router } from "express";
import { Cadastro } from "../actions/userRegisterAction";
import { Login } from "../actions/userLoginAction";

const userAuth = Router();

userAuth.post('/cadastro', Cadastro);
userAuth.post('/login', Login);

export { userAuth }