import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import { AdminLayout } from "../Core/Components/Body/AdminLayout";
import { Reservas } from "./Painel Admin - Reservas/Reservas";
import { Usuarios } from "./Painel Admin - Usuários/Usuarios";
import { Historico } from "./Sidebar/Configurações/Historico";
import { PanelBody } from "../Core/Components/Body/PanelBody";
import { Estatísticas } from "./Estatísticas/Estatísticas";
import { Config } from "./Sidebar/Configurações/Config";
import { Salas } from "./Painel Admin - Salas/Salas";  
import { Cadastro } from "./Cadastro/Cadastro";
import { Painel } from "./Painel/Painel";
import { Login } from "./Login/Login";

import PasswordRecovery from "./Login/RecuperarSenha";

export const AppRoutes = () => {
    return (
        <Router basename="/AceSchedules">
            <Routes>
                <Route element={<PanelBody />}>
                    <Route path="/Painel" element={<Painel />} />
                    <Route path="/Config" element={<Config/>}/>
                    <Route path="/Historico" element={<Historico/>}/>
                    <Route path="/Estatísticas" element={<Estatísticas/>}/>
                </Route>

                <Route element={<AdminLayout />}>
                    <Route path="/Usuarios" element={<Usuarios />} />
                    <Route path="/Reservas" element={<Reservas/>} />
                    <Route path="/Salas" element={<Salas/>} />
                </Route>
                
                <Route path="/" element={<Cadastro/>} />
                <Route path="/Login" element={<Login/>} />
                <Route path="/Login/Recovery" element={<PasswordRecovery/>} />

            </Routes>
        </Router>
    )
}