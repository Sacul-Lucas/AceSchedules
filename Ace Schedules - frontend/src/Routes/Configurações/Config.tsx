import { useState } from "react";
import { PanelSidebar } from "../../Core/Components/Sidebars/PanelSidebar"
import { DefineApp } from "../../Core/Components/Utils/DefineApp";



export const Config = () => {
    const [sidebarVisible , setSidebarVisible] = useState(true); 

    const handleGetSelectedUser = async () => {
        const getSelectedUser = await VisualizarAction.execute();
        
        const selectedUser = getSelectedUser.data;
        
        switch (getSelectedUser.status) {
            case 'SUCCESS':
                setSelectedUser(usertypeMessage);
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

    useEffect(() => {
        handleGetSelectedUser();
    }, []);

    return (
        <div>
            <DefineApp cssPath="src/Core/Css/Owned/Painel.css" appIcon="src/assets/icons/calendar-alt-solid.svg" appTitle="Ace Schedules - Painel">
                <div className="container mt-4 xl:!max-w-[75%]">
                    <div className="mb-3">
                        <label htmlFor="view_usuario">Usuário</label>
                        <p id="view_usuario" className="form-control">{selectedUser.usuario}</p>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="view_email">Email</label>
                        <p id="view_email" className="form-control">{selectedUser.email}</p>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="view_senha">Senha</label>
                        <p id="view_senha" className="form-control">{selectedUser.senha}</p>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="view_telefone">Contato</label>
                        <p id="view_telefone" className="form-control">{selectedUser.telefone}</p>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="view_cnpj">CNPJ</label>
                        <p id="view_cnpj" className="form-control">{selectedUser.cnpj}</p>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="view_usertype">Tipo de usuário</label>
                        <p id="view_usertype" className="form-control">{selectedUser.usertype}</p>
                    </div>
                </div>
            </DefineApp>
            {/* <PanelSidebar visible={sidebarVisible} setVisible={setSidebarVisible} />  */}
        </div>

)}

// export interface Usuario {
//     id: number;
//     usuario: string;
//     email: string;
//     senha: string;
//     telefone: string;
//     cnpj: string;
//     usertype: string;
// }

// interface UsuariosProps {
//     selectedUser: Usuario | null;
// }

// export const ConfigConta: React.FC<UsuariosProps> = ({
//     selectedUser,
