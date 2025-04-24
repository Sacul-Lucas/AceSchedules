import { useRef, SetStateAction, Dispatch, useState, useEffect, ReactNode } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
import { Ripple } from 'primereact/ripple';
import { ScrollPanel } from 'primereact/scrollpanel';
import { StyleClass } from 'primereact/styleclass';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UserLogoutAction } from '../../Actions/UserLogoutAction';
import { GetUsernameAction } from '../../Actions/GetUsernameAction';
import { MdOutlineMeetingRoom } from 'react-icons/md';
import { GetUsertypeAction } from '../../Actions/GetUserTypeAction';
import { getInitials } from '../Utils/functions/Formatter';
import { FaUnlock } from "react-icons/fa6";
import { FaLock } from "react-icons/fa6";
import logoAce from '../../../assets/img/Logo - Ace Schedules.jpg';
import panelSidebarStyles from '../../Css/Owned/Painel.module.css';

interface PanelSidebarProps {
    visible?: boolean, 
    setVisible?: Dispatch<SetStateAction<boolean>>,
    isFixed?: boolean
    children: ReactNode
}

export const PanelSidebar: React.FC<PanelSidebarProps> = ({ 
    visible, 
    setVisible,
    isFixed,
    children
}) => {
    const [username, setUsername] = useState('');
    const [usertype, setUsertype] = useState('');
    const location = useLocation();
    const btnRef1 = useRef(null);
    const btnRef2 = useRef(null);
    const btnRef3 = useRef(null);
    const btnRef4 = useRef(null);
    const btnRef5 = useRef(null);

    const sidebarLockedState = localStorage.getItem('isSidebarLocked')
    const [isSidebarLocked, setIsSidebarLocked] = useState(
        sidebarLockedState ? 
        sidebarLockedState === 'true' ? true : false 
        : true
    );

    const lockSidebar = () => {
        setIsSidebarLocked(prev => {
            const newValue = !prev;
            localStorage.setItem('isSidebarLocked', newValue.toString());
            return newValue;
        });
    }

    const navigate = useNavigate();

    const handleLogout = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        const logoutRes = await UserLogoutAction.execute();

        switch (logoutRes.status) {
            case 'SUCCESS':
                navigate('/Login');
                break;

            case 'UNKNOWN':
                break;

            default:
                break;
        }
    };

    const handleGetUsertype = async () => {
        const getUsertypeRes = await GetUsertypeAction.execute();
        
        const usertypeMessage = getUsertypeRes.data;
        
        switch (getUsertypeRes.status) {
            case 'SUCCESS':
                setUsertype(usertypeMessage);
                break;
    
            case 'USER_NOT_FOUND':
                navigate('/Login')
                break;
            case 'UNKNOWN':
                navigate('/Login')
                break;
    
            default:
                break;
        }
    };

    const handleGetUsername = async () => {
        const getUsernameRes = await GetUsernameAction.execute();
        
        const usernameMessage = getUsernameRes.data;
        
        switch (getUsernameRes.status) {
            case 'SUCCESS':
                setUsername(usernameMessage);
                break;

            case 'USER_NOT_FOUND':
                navigate('/Login')
                break;

            case 'UNKNOWN':
                navigate('/Login')
                break;

            default:
                break;
        }
    };

    useEffect(() => {
        handleGetUsername();
        handleGetUsertype();

        if (isFixed) {
            setIsSidebarLocked(true);
            localStorage.setItem('isSidebarLocked', 'true');
        }

        if (!sidebarLockedState) {
            localStorage.setItem('isSidebarLocked', 'true');
        }
    }, [sidebarLockedState, isFixed]);

    return (
        <div className="flex flex-row flex-nowrap">
            <div className='flex justify-content-center' id='reservationPanel'>
                <Sidebar
                    visible={isFixed || visible}
                    onHide={() => {
                        if (!isFixed && setVisible) {
                            setVisible(false);
                            localStorage.setItem('isSidebarVisible', 'false')
                        }
                    }}
                    appendTo={document.getElementById('reservationPanel')!}
                    maskClassName={`${sidebarLockedState === 'true' ? panelSidebarStyles.sidebarLocked : panelSidebarStyles.sidebarUnlocked}`}
                    content={({ closeIconRef, hide }) => (
                        <div className="relative flex min-h-screen lg:static surface-ground">
                            <div id="app-sidebar-2" className="absolute top-0 left-0 flex-shrink-0 block w-full h-screen select-none surface-section lg:static z-1 border-right-1 surface-border">
                                <div className="flex h-full flex-column">
                                    <div className="flex flex-shrink-0 px-4 pt-3 align-items-center justify-content-between">
                                        <span className="inline-flex gap-2 align-items-center">
                                            <img src={logoAce} alt="hugenerd" width="40" height="40" className="mr-1 rounded-full"/>
                                            <span className="text-2xl font-semibold text-blue-500">Ace Schedules</span>
                                        </span>
                                        <span>
                                            <Button
                                                type="button"
                                                ref={closeIconRef as any}
                                                onClick={(e) => hide(e)}
                                                icon="pi pi-times"
                                                rounded
                                                outlined
                                                className={`h-2rem w-2rem transition-all delay-150 !rounded-full ${isSidebarLocked ? 'opacity-0 invisible' : 'opacity-100 visible'}`}
                                            />
                                        </span>
                                    </div>
                                    <div className="overflow-x-hidden overflow-y-auto">
                                        <ScrollPanel className='h-full custombar1' aria-orientation='vertical'>
                                            <ul className="p-3 m-0 list-none !no-underline">
                                                <li>
                                                    <StyleClass nodeRef={btnRef1} selector="@next" enterClassName="hidden" enterActiveClassName="slidedown" leaveToClassName="hidden" leaveActiveClassName="slideup">
                                                        <div ref={btnRef1} className="flex p-3 cursor-pointer p-ripple align-items-center justify-content-between text-600">
                                                            <span className="font-medium">Painéis</span>
                                                            <i className="pi pi-chevron-down"></i>
                                                            <Ripple />
                                                        </div>
                                                    </StyleClass>
                                                    <ul className="p-0 m-0 overflow-hidden list-none">
                                                        <li>
                                                            <Link className={`flex w-full p-3 transition-colors cursor-pointer p-ripple align-items-center border-round text-700 ${location.pathname === 'https://etpc.com.br/' ? 'bg-[#007bff] text-white' : 'hover:surface-100'} transition-duration-150 !no-underline`} to={'https://etpc.com.br/'}>
                                                                <i className="mr-2 pi pi-home"></i>
                                                                <span className="font-medium">Página principal</span>
                                                                <Ripple />
                                                            </Link>
                        
                                                            <Link className={`flex w-full p-3 transition-colors cursor-pointer p-ripple align-items-center border-round text-700 ${location.pathname === '/Painel' ? 'bg-[#007bff] text-white' : 'hover:surface-100'} transition-duration-150 !no-underline`} to={'/Painel'}>
                                                                <i className="mr-2 pi pi-calendar"></i>
                                                                <span className="font-medium">Reserva de salas</span>
                                                                <Ripple />
                                                            </Link>
                                                            {usertype === 'Administrador' && (
                                                                <>
                                                                    <Link className={`flex w-full p-3 transition-colors cursor-pointer p-ripple align-items-center border-round text-700 ${location.pathname === '/Salas' ? 'bg-[#007bff] text-white' : 'hover:surface-100'} transition-duration-150 !no-underline`} to={'/Salas'}>
                                                                        <MdOutlineMeetingRoom className='mr-2 pi'/>
                                                                        <span className="font-medium">Administração de salas</span>
                                                                        <Ripple />
                                                                    </Link>
                                                                    <Link className={`flex w-full p-3 transition-colors cursor-pointer p-ripple align-items-center border-round text-700 ${location.pathname === '/Reservas' ? 'bg-[#007bff] text-white' : 'hover:surface-100'} transition-duration-150 !no-underline`} to={'/Reservas'}>
                                                                        <i className="mr-2 pi pi-clock"></i>
                                                                        <span className="font-medium">Administração de reservas</span>
                                                                        <Ripple />
                                                                    </Link>
                                                                    <Link className={`flex w-full p-3 transition-colors cursor-pointer p-ripple align-items-center border-round text-700 ${location.pathname === '/Usuarios' ? 'bg-[#007bff] text-white' : 'hover:surface-100'} transition-duration-150 !no-underline`} to={'/Usuarios'}>
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
                                                            <Link className={`flex w-full p-3 transition-colors cursor-pointer p-ripple align-items-center border-round text-700 ${location.pathname === '/Historico' ? 'bg-[#007bff] text-white' : 'hover:surface-100'} transition-duration-150 !no-underline`} to={'/Historico'}>
                                                                <i className="mr-2 pi pi-history"></i>
                                                                <span className="font-medium">Histórico</span>
                                                                <Ripple />
                                                            </Link>
                                                        </li>
                                                        {/* <li>
                                                            <Link className={`flex w-full p-3 transition-colors cursor-pointer p-ripple align-items-center border-round text-700 ${location.pathname === '/Estat%C3%ADsticas' ? 'bg-[#007bff] text-white' : 'hover:surface-100'} transition-duration-150 !no-underline`} to={'/Estatísticas'}>
                                                                <i className="mr-2 pi pi-bookmark"></i>
                                                                <span className="font-medium">Estatísticas</span>
                                                                <Ripple />
                                                            </Link>
                                                        </li> */}
                                                        <li>
                                                            <StyleClass nodeRef={btnRef3} selector="@next" enterClassName="hidden" enterActiveClassName="slidedown" leaveToClassName="hidden" leaveActiveClassName="slideup">
                                                                <a ref={btnRef3} className="flex w-full p-3 transition-colors cursor-pointer p-ripple align-items-center border-round text-700 hover:surface-100 transition-duration-150">
                                                                    <i className="mr-2 pi pi-check-square"></i>
                                                                    <span className="font-medium">Preferências</span>
                                                                    <i className="ml-auto mr-1 pi pi-chevron-down"></i>
                                                                    <Ripple />
                                                                </a>
                                                            </StyleClass>
                                                            <ul className="hidden py-0 pl-3 pr-0 m-0 overflow-y-hidden list-none transition-all transition-duration-400 transition-ease-in-out">
                                                                <li>
                                                                    <StyleClass nodeRef={btnRef4} selector="@next" enterClassName="hidden" enterActiveClassName="slidedown" leaveToClassName="hidden" leaveActiveClassName="slideup">
                                                                        <a ref={btnRef4} className="flex w-full p-3 transition-colors cursor-pointer p-ripple align-items-center border-round text-700 hover:surface-100 transition-duration-150">
                                                                            <i className="mr-2 pi pi-chart-line"></i>
                                                                            <span className="font-medium">Revenue</span>
                                                                            <i className="ml-auto mr-1 pi pi-chevron-down"></i>
                                                                            <Ripple />
                                                                        </a>
                                                                    </StyleClass>
                                                                    <ul className="hidden py-0 pl-3 pr-0 m-0 overflow-y-hidden list-none transition-all transition-duration-400 transition-ease-in-out">
                                                                        <li>
                                                                            <a className="flex w-full p-3 transition-colors cursor-pointer p-ripple align-items-center border-round text-700 hover:surface-100 transition-duration-150">
                                                                                <i className="mr-2 pi pi-table"></i>
                                                                                <span className="font-medium">View</span>
                                                                                <Ripple />
                                                                            </a>
                                                                        </li>
                                                                        <li>
                                                                            <a className="flex w-full p-3 transition-colors cursor-pointer p-ripple align-items-center border-round text-700 hover:surface-100 transition-duration-150">
                                                                                <i className="mr-2 pi pi-search"></i>
                                                                                <span className="font-medium">Search</span>
                                                                                <Ripple />
                                                                            </a>
                                                                        </li>
                                                                    </ul>
                                                                </li>
                                                                <li>
                                                                    <Link className={`flex w-full p-3 transition-colors cursor-pointer p-ripple align-items-center border-round text-700 ${location.pathname === '/Expenses' ? 'bg-[#007bff] text-white' : 'hover:surface-100'} transition-duration-150 !no-underline`} to={'/Expenses'}>
                                                                        <i className="mr-2 pi pi-chart-line"></i>
                                                                        <span className="font-medium">Expenses</span>
                                                                        <Ripple />
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </li>
                                                    </ul>
                                                </li>
                                            </ul>
                                            <ul className="p-3 m-0 list-none">
                                                <li>
                                                    <StyleClass nodeRef={btnRef5} selector="@next" enterClassName="hidden" enterActiveClassName="slidedown" leaveToClassName="hidden" leaveActiveClassName="slideup">
                                                        <div ref={btnRef5} className="flex p-3 cursor-pointer p-ripple align-items-center justify-content-between text-600">
                                                            <span className="font-medium">Perfil</span>
                                                            <i className="pi pi-chevron-down"></i>
                                                            <Ripple />
                                                        </div>
                                                    </StyleClass>
                                                    <ul className="p-0 m-0 overflow-hidden list-none">
                                                        <li>
                                                            <Link className={`flex w-full p-3 transition-colors cursor-pointer p-ripple align-items-center border-round text-700 ${location.pathname === '/Config' ? 'bg-[#007bff] text-white' : 'hover:surface-100'} transition-duration-150 !no-underline`} to={'/Config'}>
                                                                <i className="mr-2 pi pi-cog"></i>
                                                                <span className="font-medium">Configurações</span>
                                                                <Ripple />
                                                            </Link>
                                                        </li>

                                                        <li>
                                                            <a className="flex w-full p-3 transition-colors p-ripple align-items-center border-round text-700 hover:surface-100 transition-duration-150" onClick={handleLogout}>
                                                                <i className="mr-2 pi pi-sign-out"></i>
                                                                <span className="font-medium">Sair</span>
                                                                <Ripple />
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </ScrollPanel>
                                    </div>
                                    <div className="mt-auto">
                                        <hr className="mx-3 mb-3 border-none border-top-1 surface-border" />
                                        <div className="flex gap-2 p-3 m-3 transition-colors align-items-center border-round text-700 transition-duration-150 p-ripple">
                                            <Avatar className='items-center justify-center align-middle bg-blue-500 text-slate-100' label={getInitials(username)} shape="circle" />
                                            <span className="font-bold">{username}</span>
                                            <button className='justify-end ml-auto' onClick={isFixed ? () => {} : lockSidebar}>
                                                {
                                                    isFixed 
                                                        ? <FaLock/> 
                                                        : sidebarLockedState === 'true' 
                                                            ? <FaLock/> 
                                                            : <FaUnlock/>
                                                }
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                />
            </div>

            {children}
        </div>
    )
}