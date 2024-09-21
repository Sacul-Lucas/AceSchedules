import { ReactNode } from "react";
import { DefineApp } from "../Utils/DefineApp";
import { FaHome } from "react-icons/fa";
import { FaCalendar } from "react-icons/fa6";
import { FaClock } from "react-icons/fa6";
import { FaUser } from "react-icons/fa6";
import { MdMeetingRoom } from "react-icons/md";
import { useLocation, Link } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle.min";

interface AdminSidebarProps {
    children: ReactNode,
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ 
    children
}) => {
    const location = useLocation();

    return (
        <DefineApp cssPath="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css" appTitle={`Ace Schedules - Painel administrador de ${location.pathname.substring(1)}`} appIcon="src/assets/icons/admin-alt-solid.svg" isCssDiff={true}>
            <div className="container-fluid">
                <div className="row flex-nowrap">
                    <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 !bg-[rgb(159_159_159_/_11%)]">
                        <div className="px-1 pt-2 text-black d-flex flex-column align-items-center align-items-sm-start min-vh-100">
                            <Link to="/" className="pb-3 text-black d-flex align-items-center mb-md-0 me-md-auto text-decoration-none">
                                <img src="src/assets/img/Logo - Ace Schedules.jpg" alt="hugenerd" width="40" height="40" className="mr-2 rounded-circle"/>
                                <span className="fs-5 d-none d-sm-inline">Menu administrador</span>
                            </Link>
                            <ul className="mb-0 nav nav-pills flex-column mb-sm-auto align-items-center align-items-sm-start" id="menu">
                                {['/', '/Painel', '/Salas', '/Reservas', '/Usuarios'].map((path, index) => (
                                    <li className="nav-item" key={index}>
                                        <Link
                                            to={path}
                                            className={`nav-link align-middle px-0 !flex flex-row justify-center items-center ${location.pathname === path ? 'active' : ''}`}
                                        >
                                            <i className="ml-2 fs-4">
                                                {index === 0 && <FaHome />}
                                                {index === 1 && <FaCalendar />}
                                                {index === 2 && <MdMeetingRoom />}
                                                {index === 3 && <FaClock />}
                                                {index === 4 && <FaUser />}
                                            </i>
                                            <span className="mx-2 d-none d-sm-inline">
                                                {index === 0 && "Home"}
                                                {index === 1 && "Painel de reservas"}
                                                {index === 2 && "Administração de salas"}
                                                {index === 3 && "Administração de reservas"}
                                                {index === 4 && "Administração de usuários"}
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            <hr/>
                            <div className="pb-4 dropdown">
                                <a href="#" role="button" className="text-black d-flex align-items-center text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                                    <img src="https://github.com/mdo.png" alt="hugenerd" width="30" height="30" className="rounded-circle"/>
                                    <span className="mx-1 d-none d-sm-inline">Administrador</span>
                                </a>
                                <ul className="shadow dropdown-menu dropdown-menu-dark text-small" aria-labelledby="dropdownUser1">
                                    <li><a className="dropdown-item" href="#">Configurações</a></li>
                                    <li><a className="dropdown-item" href="#">Perfil</a></li>
                                    <li><hr className="dropdown-divider"/></li>
                                    <li><a className="dropdown-item" href="#">Sair</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        </DefineApp>
    );
};