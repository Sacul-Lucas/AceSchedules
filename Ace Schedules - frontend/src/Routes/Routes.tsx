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
            </Routes>
        </Router>
    )
}