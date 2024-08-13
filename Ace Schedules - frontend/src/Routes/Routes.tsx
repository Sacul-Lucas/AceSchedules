import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import { Cadastro } from "./Cadastro/Cadastro";
import { Login } from "./Login/Login";
import { Painel } from "./Painel/Painel";
  

export const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Cadastro/>} />
                <Route path="/Login" element={<Login/>} />
                <Route path="/Painel" element={<Painel/>} />
            </Routes>
        </Router>
    )
}