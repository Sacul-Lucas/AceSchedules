import { useRef, useState, useEffect } from 'react';
import { Avatar } from 'primereact/avatar';
import { Ripple } from 'primereact/ripple';
import { StyleClass } from 'primereact/styleclass';
import { Link, useNavigate } from 'react-router-dom';
import { UserLogoutAction } from '../../Actions/UserLogoutAction';
import { GetUsernameAction } from '../../Actions/GetUsernameAction';
import { MdOutlineMeetingRoom } from 'react-icons/md';
import { GetUsertypeAction } from '../../Actions/GetUserTypeAction';
import { DefineApp } from '../Utils/DefineApp';

export const AdminSidebar: React.FC = () => {
    const btnRef1 = useRef(null);
    const btnRef2 = useRef(null);
    const btnRef3 = useRef(null);
    const btnRef4 = useRef(null);
    const btnRef5 = useRef(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [username, setUsername] = useState('');
    const [usertype, setUsertype] = useState('');

    const navigate = useNavigate();

    const handleLogout = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        const logoutRes = await UserLogoutAction.execute();
        const message = logoutRes.data;

        switch (logoutRes.status) {
            case 'SUCCESS':
                setSuccess(message);
                setError('');
                navigate('/login');
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
                setUsertype(usertypeMessage);
                setError('');
                break;
    
            case 'USER_NOT_FOUND':
                setError(usertypeMessage);
                setSuccess('');
                navigate('/Login')
                break;
            case 'UNKNOWN':
                setError(usertypeMessage);
                setSuccess('');
                navigate('/Login')
                break;
    
            default:
                setError('Não foi possível obter o tipo de usuário. Tente novamente mais tarde.');
                setSuccess('');
                break;
        }
    };

    const handleGetUsername = async () => {
        const getUsernameRes = await GetUsernameAction.execute();
        
        const usernameMessage = getUsernameRes.data;
        
        switch (getUsernameRes.status) {
            case 'SUCCESS':
                setUsername(usernameMessage);
                setError('');
                break;

            case 'USER_NOT_FOUND':
                setError(usernameMessage);
                setSuccess('');
                navigate('/Login')
                break;

            case 'UNKNOWN':
                setError(usernameMessage);
                setSuccess('');
                navigate('/Login')
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
        <div className="flex">
                    <div className="relative flex lg:static surface-ground">
                        <div id="app-sidebar-2" className="fixed top-0 left-0 flex-shrink-0 block h-screen select-none surface-section z-1 border-right-1 surface-border">
                            <div className="flex h-full flex-column">
                                <div className="bg-white flex flex-shrink-0 px-4 pt-3 align-items-center justify-content-between">
                                    <span className="inline-flex gap-2 align-items-center">
                                        <img src="src/assets/img/Logo - Ace Schedules.jpg" alt="hugenerd" width="40" height="40" className="mr-1 rounded-full"/>
                                        <span className="text-2xl font-semibold text-blue-500">Ace Schedules</span>
                                    </span>
                                </div>
                                <div className="overflow-y-auto bg-white">
                                    <ul className="p-3 m-0 list-none !no-underline">
                                        <li>
                                            <StyleClass nodeRef={btnRef1} selector="@next" enterClassName="hidden" enterActiveClassName="slidedown" leaveToClassName="hidden" leaveActiveClassName="slideup">
                                                <div ref={btnRef1} className="text-black flex p-3 cursor-pointer p-ripple align-items-center justify-content-between text-600">
                                                    <span className="font-medium">Painéis</span>
                                                    <i className="pi pi-chevron-down"></i>
                                                    <Ripple />
                                                </div>
                                            </StyleClass>
                                            <ul className="p-0 m-0 overflow-hidden list-none">
                                                <li>
                                                    <Link className="hover:text-black hover:no-underline hover:bg-slate-100 text-black flex w-full p-3 transition-colors cursor-pointer p-ripple align-items-center border-round text-700 hover:surface-100 transition-duration-150" to={'https://etpc.com.br/'}>
                                                        <i className="mr-2 pi pi-home"></i>
                                                        <span className="font-medium">Página principal</span>
                                                        <Ripple />
                                                    </Link>
                                                    <Link className="hover:text-black hover:no-underline hover:bg-slate-100 text-black flex w-full p-3 transition-colors cursor-pointer p-ripple align-items-center border-round text-700 hover:surface-100 transition-duration-150" to={'/Painel'}>
                                                        <i className="mr-2 pi pi-calendar"></i>
                                                        <span className="font-medium">Painel de salas</span>
                                                        <Ripple />
                                                    </Link>
                                                    {usertype === 'Administrador' && (
                                                        <>
                                                            <Link className="hover:text-black hover:no-underline hover:bg-slate-100 text-black flex w-full p-3 transition-colors cursor-pointer p-ripple align-items-center border-round text-700 hover:surface-100 transition-duration-150" to={'/Salas'}>
                                                                <MdOutlineMeetingRoom className='mr-2 pi'/>
                                                                <span className="font-medium">Administração de salas</span>
                                                                <Ripple />
                                                            </Link>
                                                            <Link className="hover:text-black hover:no-underline hover:bg-slate-100 text-black flex w-full p-3 transition-colors cursor-pointer p-ripple align-items-center border-round text-700 hover:surface-100 transition-duration-150" to={'/Reservas'}>
                                                                <i className="mr-2 pi pi-clock"></i>
                                                                <span className="font-medium">Administração de reservas</span>
                                                                <Ripple />
                                                            </Link>
                                                            <Link className="hover:text-black hover:no-underline hover:bg-slate-100 text-black flex w-full p-3 transition-colors cursor-pointer p-ripple align-items-center border-round text-700 hover:surface-100 transition-duration-150" to={'/Usuarios'}>
                                                                <i className="mr-2 pi pi-user"></i>
                                                                <span className="font-medium">Administração de usuários</span>
                                                                <Ripple />
                                                            </Link>
                                                        </>
                                                    )}
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                    <ul className="p-3 m-0 list-none">
                                        <li>
                                            <StyleClass nodeRef={btnRef2} selector="@next" enterClassName="hidden" enterActiveClassName="slidedown" leaveToClassName="hidden" leaveActiveClassName="slideup">
                                                <div ref={btnRef2} className="flex p-3 cursor-pointer p-ripple align-items-center justify-content-between text-600">
                                                    <span className="font-medium">Reservas</span>
                                                    <i className="pi pi-chevron-down"></i>
                                                    <Ripple />
                                                </div>
                                            </StyleClass>
                                            <ul className="p-0 m-0 overflow-hidden list-none">
                                                <li>
                                                    <Link className="hover:text-black hover:no-underline hover:bg-slate-100 text-black	flex w-full p-3 transition-colors cursor-pointer p-ripple align-items-center border-round text-700 hover:surface-100 transition-duration-150" to={'/Historico'}>
                                                        <i className="mr-2 pi pi-history"></i>
                                                        <span className="font-medium">Histórico</span>
                                                        <Ripple />
                                                    </Link>
                                                </li>
                                                <li>
                                                    <a className="hover:text-black hover:no-underline hover:bg-slate-100 flex w-full p-3 transition-colors cursor-pointer p-ripple align-items-center border-round text-700 hover:surface-100 transition-duration-150">
                                                        <i className="mr-2 pi pi-bookmark"></i>
                                                        <span className="font-medium">Salas mais reservadas</span>
                                                        <Ripple />
                                                    </a>
                                                </li>
                                                <li>
                                                    <StyleClass nodeRef={btnRef3} selector="@next" enterClassName="hidden" enterActiveClassName="slidedown" leaveToClassName="hidden" leaveActiveClassName="slideup">
                                                        <a ref={btnRef3} className="hover:text-black hover:no-underline hover:bg-slate-100 flex w-full p-3 transition-colors cursor-pointer p-ripple align-items-center border-round text-700 hover:surface-100 transition-duration-150">
                                                            <i className="mr-2 pi pi-check-square"></i>
                                                            <span className="font-medium">Preferências</span>
                                                            <i className="ml-auto mr-1 pi pi-chevron-down"></i>
                                                            <Ripple />
                                                        </a>
                                                    </StyleClass>
                                                    <ul className="hidden py-0 pl-3 pr-0 m-0 overflow-y-hidden list-none transition-all transition-duration-400 transition-ease-in-out">
                                                        <li>
                                                            <StyleClass nodeRef={btnRef4} selector="@next" enterClassName="hidden" enterActiveClassName="slidedown" leaveToClassName="hidden" leaveActiveClassName="slideup">
                                                                <a ref={btnRef4} className="hover:text-black hover:no-underline hover:bg-slate-100 flex w-full p-3 transition-colors cursor-pointer p-ripple align-items-center border-round text-700 hover:surface-100 transition-duration-150">
                                                                    <i className="mr-2 pi pi-chart-line"></i>
                                                                    <span className="font-medium">Revenue</span>
                                                                    <i className="ml-auto mr-1 pi pi-chevron-down"></i>
                                                                    <Ripple />
                                                                </a>
                                                            </StyleClass>
                                                            <ul className="hidden py-0 pl-3 pr-0 m-0 overflow-y-hidden list-none transition-all transition-duration-400 transition-ease-in-out">
                                                                <li>
                                                                    <a className="hover:text-black hover:no-underline hover:bg-slate-100 flex w-full p-3 transition-colors cursor-pointer p-ripple align-items-center border-round text-700 hover:surface-100 transition-duration-150">
                                                                        <i className="mr-2 pi pi-table"></i>
                                                                        <span className="font-medium">View</span>
                                                                        <Ripple />
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a className="hover:text-black hover:no-underline hover:bg-slate-100 flex w-full p-3 transition-colors cursor-pointer p-ripple align-items-center border-round text-700 hover:surface-100 transition-duration-150">
                                                                        <i className="mr-2 pi pi-search"></i>
                                                                        <span className="font-medium">Search</span>
                                                                        <Ripple />
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </li>
                                                        <li>
                                                            <a className="hover:text-black hover:no-underline hover:bg-slate-100 flex w-full p-3 transition-colors cursor-pointer p-ripple align-items-center border-round text-700 hover:surface-100 transition-duration-150">
                                                                <i className="mr-2 pi pi-chart-line"></i>
                                                                <span className="font-medium">Expenses</span>
                                                                <Ripple />
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li>
                                                    <a className="hover:text-black hover:no-underline hover:bg-slate-100 flex w-full p-3 transition-colors cursor-pointer p-ripple align-items-center border-round text-700 hover:surface-100 transition-duration-150">
                                                        <i className="mr-2 pi pi-question-circle"></i>
                                                        <span className="font-medium">Suporte</span>
                                                        <Ripple />
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                    <ul className="p-3 m-0 list-none">
                                        <li>
                                            <StyleClass nodeRef={btnRef5} selector="@next" enterClassName="hidden" enterActiveClassName="slidedown" leaveToClassName="hidden" leaveActiveClassName="slideup">
                                                <div ref={btnRef5} className="hover:text-black hover:no-underline flex p-3 cursor-pointer p-ripple align-items-center justify-content-between text-600">
                                                    <span className="font-medium">Perfil</span>
                                                    <i className="pi pi-chevron-down"></i>
                                                    <Ripple />
                                                </div>
                                            </StyleClass>
                                            <ul className="p-0 m-0 overflow-hidden list-none">
                                                <li>
                                                <Link className="hover:text-black hover:no-underline hover:bg-slate-100 text-black	flex w-full p-3 transition-colors cursor-pointer p-ripple align-items-center border-round text-700 hover:surface-100 transition-duration-150" to="/Config">
                                                    <i className="mr-2 pi pi-cog"></i>
                                                    <span className="font-medium">Configurações</span>
                                                    <Ripple />
                                                </Link>
                                                </li>
                                                
                                                <li>
                                                    <a className="hover:text-black hover:no-underline hover:bg-slate-100 flex w-full p-3 transition-colors p-ripple align-items-center border-round text-700 hover:surface-100 transition-duration-150" onClick={handleLogout}>
                                                        <i className="mr-2 pi pi-sign-out"></i>
                                                        <span className="font-medium">Sair</span>
                                                        <Ripple />
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                                <div className="mt-auto bg-white">
                                    <hr className="!mx-3 !mb-3 !border-top-1 !surface-border" />
                                    <a className="!flex !gap-2 !p-3 !m-3 !transition-colors !cursor-pointer !align-items-center !border-round !text-700 !hover:surface-100 !transition-duration-150 !p-ripple">
                                        <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" shape="circle" />
                                        <span className="font-bold">{username}</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
        </div>
    </DefineApp>
    )
}