import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import { Cadastro } from "./Cadastro/Cadastro";
import { Login } from "./Login/Login";
  

export const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Cadastro/>} />
                <Route path="/Login" element={<Login/>} />
            </Routes>
        </Router>
    )
}