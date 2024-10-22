import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import { Cadastro } from "./Cadastro/Cadastro";
import { Login } from "./Login/Login";
import { Painel } from "./Painel/Painel";
import { Reservas } from "./Painel Admin - Reservas/Reservas";
import { Usuarios } from "./Painel Admin - Usuários/Usuarios";
import { Salas } from "./Painel Admin - Salas/Salas";  
import { PageSpinner } from "../Core/Components/Utils/PageSpinner";
import { Config } from "./Sidebar/Configurações/Config";
import { Historico } from "./Sidebar/Configurações/Historico";
import PasswordRecovery from "./Login/RecuperarSenha";

export const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Cadastro/>} />
                <Route path="/Login" element={<Login/>} />
                <Route path="/Login/Recovery" element={<PasswordRecovery/>} />
                <Route path="/Painel" element={<Painel/>} />
                <Route path="/Reservas" element={<Reservas/>} />
                <Route path="/Usuarios" element={<Usuarios/>} />
                <Route path="/Salas" element={<Salas/>} />
                <Route path="/Config" element={<Config/>}/>
                <Route path="/Historico" element={<Historico/>}/>
                <Route path="/Spinner" element={<PageSpinner isLoading={true}/>} />
            </Routes>
        </Router>
    )
}