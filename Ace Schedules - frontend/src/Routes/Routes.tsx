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
import { ConfigConta } from "./Configurações/ConfigConta";
import { Config } from "./Configurações/Config";

export const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Cadastro/>} />
                <Route path="/Login" element={<Login/>} />
                <Route path="/Painel" element={<Painel/>} />
                <Route path="/Reservas" element={<Reservas/>} />
                <Route path="/Usuarios" element={<Usuarios/>} />
                <Route path="/Salas" element={<Salas/>} />
                <Route path="/Config" element={<Config/>}/>
                <Route path="/Config/Conta" element={<ConfigConta selectedUser={null}/>}/>
                <Route path="/Spinner" element={<PageSpinner isLoading={true}/>} />
            </Routes>
        </Router>
    )
}