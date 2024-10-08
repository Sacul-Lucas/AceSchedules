import { ReactNode, useEffect, useState } from "react";
import { DefineApp } from "../Utils/DefineApp";
import { FaHome, FaCalendar, FaClock, FaUser } from "react-icons/fa";
import { MdMeetingRoom } from "react-icons/md";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { UserLogoutAction } from "../../Actions/UserLogoutAction";
import { GetUsernameAction } from "../../Actions/GetUsernameAction";
import { GetUsertypeAction } from "../../Actions/GetUserTypeAction";
import { Avatar } from "primereact/avatar";
import { getInitials } from "../Utils/functions/Formatter";
import "bootstrap/dist/js/bootstrap.bundle.min";

interface AdminSidebarProps {
    children: ReactNode,
}

const adminRoutes = ['/', '/Painel', '/Salas', '/Reservas', '/Usuarios'];

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ children }) => {
    const location = useLocation();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [nameSuccess, setNameSuccess] = useState('');
    const [nameError, setNameError] = useState('');
    const [username, setUsername] = useState('');
    
    const navigate = useNavigate();
    
    const handleLogout = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const logoutRes = await UserLogoutAction.execute();
        const message = logoutRes.data;
        
        switch (logoutRes.status) {
            case 'SUCCESS':
                setSuccess(message);
                setError('');
                navigate('/Login');
                break;
            case 'UNKNOWN':
                setError(message);
                setSuccess('');
                break;
            default:
                setError('Não foi possível fazer logout no momento. Tente novamente mais tarde.');
                setSuccess('');
                break;
        }
    };

    const handleGetUsertype = async () => {
        const getUsertypeRes = await GetUsertypeAction.execute();
        
        const usertypeMessage = getUsertypeRes.data;
        
        switch (getUsertypeRes.status) {
            case 'SUCCESS':
                setError('');
                if (usertypeMessage !== 'Administrador') {
                    navigate('/Painel')
                }
                break;
    
            case 'USER_NOT_FOUND':
                setNameError(usertypeMessage);
                setNameSuccess('');
                navigate('/Login')
                break;
            case 'UNKNOWN':
                setNameError(usertypeMessage);
                setNameSuccess('');
                navigate('/Login')
                break;
    
            default:
                setNameError('Não foi possível obter o tipo de usuário. Tente novamente mais tarde.');
                setNameSuccess('');
                break;
        }
    };
    
    const handleGetUsername = async () => {
        const getUsernameRes = await GetUsernameAction.execute();
        const message = getUsernameRes.data;
        
        switch (getUsernameRes.status) {
            case 'SUCCESS':
                setUsername(message);
                setError('');
                break;
            case 'USER_NOT_FOUND':
            case 'UNKNOWN':
                setError(message);
                setSuccess('');
                break;
            default:
                setError('Não foi possível obter o nome do usuário. Tente novamente mais tarde.');
                setSuccess('');
                break;
        }
    };
    
    useEffect(() => {
        handleGetUsername();
        handleGetUsertype();
    }, []);
    
    return (
        <DefineApp 
            cssPath="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css" 
            appTitle={`Ace Schedules - Painel administrador de ${location.pathname.substring(1)}`} 
            appIcon="src/assets/icons/admin-alt-solid.svg"
            isCssEquiv={true}
        >
            <div className="container-fluid">
                <div className="row flex-nowrap">
                    <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 !bg-[rgb(159_159_159_/_11%)] min-vh-100">
                        <div className="fixed px-1 pt-2 text-black d-flex flex-column align-items-center align-items-sm-start min-vh-100">
                            <Link to="/" className="pb-3 text-black d-flex align-items-center mb-md-0 me-md-auto text-decoration-none">
                                <img src="src/assets/img/Logo - Ace Schedules.jpg" alt="Logo" width="40" height="40" className="mr-2 rounded-circle"/>
                                <span className="fs-5 d-none d-sm-inline">Menu administrador</span>
                            </Link>
                            <ul className="mb-0 nav nav-pills flex-column mb-sm-auto align-items-center align-items-sm-start" id="menu">
                                {adminRoutes.map((path, index) => (
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
                                                {index === 0 && "Página principal"}
                                                {index === 1 && "Painel de reservas"}
                                                {index === 2 && "Administração de salas"}
                                                {index === 3 && "Administração de reservas"}
                                                {index === 4 && "Administração de usuários"}
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            <hr />
                            <div className="fixed bottom-0 pb-4 dropdown">
                                <a href="#" role="button" className="text-black d-flex align-items-center text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                                    <Avatar className='items-center justify-center align-middle bg-blue-500 text-slate-100' label={getInitials(username)} shape="circle" />
                                    <span className="mx-1 font-bold d-none d-sm-inline">{!nameError ? username : nameError}</span>
                                </a>
                                <ul className="shadow dropdown-menu dropdown-menu-dark text-small" aria-labelledby="dropdownUser1">
                                    <li><a className="dropdown-item" href="#">Configurações</a></li>
                                    <li><a className="dropdown-item" href="#">Perfil</a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><a className="dropdown-item" onClick={handleLogout}>Sair</a></li>
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
