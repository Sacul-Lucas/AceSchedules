import { useRef, SetStateAction, Dispatch, useState, useEffect } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
import { Ripple } from 'primereact/ripple';
import { StyleClass } from 'primereact/styleclass';
import { Link, useNavigate } from 'react-router-dom';
import { UserLogoutAction } from '../../Actions/UserLogoutAction';
import { GetUsernameAction } from '../../Actions/GetUsernameAction';

interface PanelSidebarProps {
    visible: boolean, 
    setVisible: Dispatch<SetStateAction<boolean>>
}

export const PanelSidebar: React.FC<PanelSidebarProps> = ({ 
    visible, 
    setVisible
}) => {
    const btnRef1 = useRef(null);
    const btnRef2 = useRef(null);
    const btnRef3 = useRef(null);
    const btnRef4 = useRef(null);
    const btnRef5 = useRef(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
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

    const handleGetUsername = async () => {
        const getUsernameRes = await GetUsernameAction.execute();
        
        const message = getUsernameRes.data;
        
        switch (getUsernameRes.status) {
            case 'SUCCESS':
                setUsername(message);
                setError('');
                break;

            case 'USER_NOT_FOUND':
                setError(message);
                setSuccess('');
                break;
        
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
    }, []);

    return (
        <div className={`flex justify-content-center ${visible ? '!flex' : '!hidden'}`}>
            <Sidebar
                visible={visible}
                onHide={() => setVisible(false)}
                content={({ closeIconRef, hide }) => (
                    <div className="relative flex min-h-screen lg:static surface-ground">
                        <div id="app-sidebar-2" className="absolute top-0 left-0 flex-shrink-0 block h-screen select-none surface-section lg:static z-1 border-right-1 surface-border" style={{ width: '100%' }}>
                            <div className="flex h-full flex-column">
                                <div className="flex flex-shrink-0 px-4 pt-3 align-items-center justify-content-between">
                                    <span className="inline-flex gap-2 align-items-center">
                                        <img src="src/assets/img/Logo - Ace Schedules.jpg" alt="hugenerd" width="40" height="40" className="mr-1 rounded-full"/>
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
                                            className="h-2rem w-2rem"
                                        />
                                    </span>
                                </div>
                                <div className="overflow-y-auto">
                                    <ul className="p-3 m-0 list-none">
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
                                                    <Link className="flex w-full p-3 transition-colors cursor-pointer p-ripple align-items-center border-round text-700 hover:surface-100 transition-duration-150" to={'https://etpc.com.br/'}>
                                                        <i className="mr-2 pi pi-home"></i>
                                                        <span className="font-medium">Página principal</span>
                                                        <Ripple />
                                                    </Link>
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
                                                    <a className="flex w-full p-3 transition-colors cursor-pointer p-ripple align-items-center border-round text-700 hover:surface-100 transition-duration-150">
                                                        <i className="mr-2 pi pi-history"></i>
                                                        <span className="font-medium">Histórico</span>
                                                        <Ripple />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a className="flex w-full p-3 transition-colors cursor-pointer p-ripple align-items-center border-round text-700 hover:surface-100 transition-duration-150">
                                                        <i className="mr-2 pi pi-bookmark"></i>
                                                        <span className="font-medium">Salas mais reservadas</span>
                                                        <Ripple />
                                                    </a>
                                                </li>
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
                                                            <a className="flex w-full p-3 transition-colors cursor-pointer p-ripple align-items-center border-round text-700 hover:surface-100 transition-duration-150">
                                                                <i className="mr-2 pi pi-chart-line"></i>
                                                                <span className="font-medium">Expenses</span>
                                                                <Ripple />
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li>
                                                    <a className="flex w-full p-3 transition-colors cursor-pointer p-ripple align-items-center border-round text-700 hover:surface-100 transition-duration-150">
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
                                                <div ref={btnRef5} className="flex p-3 cursor-pointer p-ripple align-items-center justify-content-between text-600">
                                                    <span className="font-medium">Perfil</span>
                                                    <i className="pi pi-chevron-down"></i>
                                                    <Ripple />
                                                </div>
                                            </StyleClass>
                                            <ul className="p-0 m-0 overflow-hidden list-none">
                                                <li>
                                                    <a className="flex w-full p-3 transition-colors cursor-pointer p-ripple align-items-center border-round text-700 hover:surface-100 transition-duration-150">
                                                        <i className="mr-2 pi pi-user"></i>
                                                        <span className="font-medium">Minha conta</span>
                                                        <Ripple />
                                                    </a>
                                                </li>

                                                <li>
                                                    <a className="flex w-full p-3 transition-colors cursor-pointer p-ripple align-items-center border-round text-700 hover:surface-100 transition-duration-150">
                                                        <i className="mr-2 pi pi-cog"></i>
                                                        <span className="font-medium">Configurações</span>
                                                        <Ripple />
                                                    </a>
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
                                </div>
                                <div className="mt-auto">
                                    <hr className="mx-3 mb-3 border-none border-top-1 surface-border" />
                                    <a className="flex gap-2 p-3 m-3 transition-colors cursor-pointer align-items-center border-round text-700 hover:surface-100 transition-duration-150 p-ripple">
                                        <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" shape="circle" />
                                        <span className="font-bold">{username}</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            ></Sidebar>
        </div>
    )
}