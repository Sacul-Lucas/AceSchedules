import { useEffect, useRef, useState } from "react";
import { VisualizarActionConfig } from "../../../Core/Actions/VisualizarActionConfig";
import { useNavigate } from "react-router-dom";
import { IMaskInput } from "react-imask";
import { Avatar } from "primereact/avatar";
import { PanelSidebar } from "../../../Core/Components/Sidebars/PanelSidebar";
import { DefineApp } from "../../../Core/Components/Utils/DefineApp";
import { Navbar } from "../../../Core/Components/Navbar/Navbar";
import { getInitials, stringToColor } from "../../../Core/Components/Utils/functions/Formatter";
import { Messages } from 'primereact/messages';

export const Config = () => {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState<any>();
    const [initialValues, setInitialValues] = useState<any>({});
    const [formValues, setFormValues] = useState<any>({});
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false); // Estado para controlar a visibilidade da senha
    const messagesRef = useRef<Messages>(null);

    const navigate = useNavigate();

    const toggleSidebar = () => {
        setSidebarVisible(prev => !prev);
    };

    const actionSave = async () => {
        try {
            const endpoint = '/api/userAuth/Editconfig';
            const { usuario, email, senha, usertype, telefone, cnpj } = formValues;
    
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ usuario, email, senha, usertype, telefone, cnpj }),
            });
    
            const result = await response.json();
    
            if (result.success) {
                messagesRef.current?.show({ severity: 'success', detail: result.message });
                handleGetSelectedUser(); // Atualizar dados do usuário após salvar
            } else {
                messagesRef.current?.show({ severity: 'error', detail: result.message });
            }
        } catch (error) {
            console.error("Erro ao salvar usuário:", error);
            messagesRef.current?.show({ severity: 'error', detail: 'Erro ao salvar usuário' });
        }
    };

    const handleGetSelectedUser = async () => {
        console.log("Obtendo dados do usuário selecionado...");
        const getSelectedUser = await VisualizarActionConfig.execute();

        console.log("Dados recebidos:", getSelectedUser);

        switch (getSelectedUser.status) {
            case 'SUCCESS':
                setSelectedUser(getSelectedUser.data);
                setInitialValues(getSelectedUser.data); // Definir os valores iniciais
                setFormValues(getSelectedUser.data); // Definir os valores atuais do formulário
                setError('');
                break;

            case 'USER_NOT_FOUND':
            case 'UNKNOWN':
                console.log("Erro ao obter usuário. Redirecionando para Login.");
                setSuccess('');
                navigate('/Login');
                break;

            default:
                console.error("Erro inesperado:", getSelectedUser.data);
                setError('Não foi possível obter o tipo de usuário. Tente novamente mais tarde.');
                setSuccess('');
                break;
        }
    };

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleCancel = () => {
        setFormValues(initialValues); // Resetar valores dos inputs
    };

    const handleSave = () => {
        actionSave(); // Salvar alterações
    };

    useEffect(() => {
        handleGetSelectedUser();
    }, []);

return (
    <div>
        <DefineApp cssPath="src/Core/Css/Owned/Painel.css" appIcon="src/assets/icons/calendar-alt-solid.svg" appTitle="Ace Schedules - Painel">
        <Navbar showSidebar={toggleSidebar}/>

        <div className="flex h-[80vh] w-[100%] place-items-center place-content-center">
            <div className="mt-4 rounded-md border-2 flex !p-0 place-self-center size-52 w-[60vw] h-[50vh]">

                <div className="min-w-[12vw] flex flex-col items-center h-full">

                    <div className="flex flex-col items-center justify-center pr-4 pl-4 pt-5 ">
                        <Avatar 
                            className="w-24 h-24 text-white text-3xl" 
                            label={getInitials(formValues.usuario)} 
                            shape="circle" 
                            style={{ backgroundColor: stringToColor(formValues.usuario || '') }} // Aplicando cor gerada
                        />
                        <h4 className="pb-5 pr-5 pl-5 text-center text-2xl">
                            {selectedUser?.usuario}
                        </h4>
                    </div>

                    <div className="flex flex-col w-full">
                        <a className="border-b-2 pt-2 pb-4 flex place-items-start justify-start pl-5" href="#account-general">Conta</a>
                    </div>
                </div>

                <div className="w-full max-w-[48vw] h-full border-l-2 pt-10 pl-10 pr-10">
                    <h2 className="font-weight-bold py-3 mb-4 text-xl text-xl">Configurações de conta</h2>

                    <div className="!grid grid-rows-3 grid-flow-col gap-4 !gap-4 w-full h-1/2">

                        <div className="mb-3 w-full">
                            <label htmlFor="nomeConfig" className="block text-sm font-medium text-gray-700">Nome do Usuário:</label>
                            <input
                                type="text"
                                name="usuario"
                                id="nomeConfig"
                                className="form-control rounded-md border border-zinc-400 w-full p-2"
                                placeholder="Insira o nome do usuário"
                                value={formValues.usuario || ""}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="mb-3 w-full">
                            <label htmlFor="emailConfig" className="block text-sm font-medium text-gray-700">Email:</label>
                            <input
                                type="email"
                                name="email"
                                id="emailConfig"
                                className="form-control rounded-md border border-zinc-400 w-full p-2"
                                placeholder="Insira o email do usuário"
                                value={formValues.email || ""}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="mb-3 relative w-full">
                            <label htmlFor="senhaConfig" className="block text-sm font-medium text-gray-700">
                                Mudar senha:
                            </label>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="senha"
                                id="senhaConfig"
                                className="form-control rounded-md border border-zinc-400 w-full p-2 pr-10" // "pr-10" deixa espaço para o botão
                                placeholder="Insira uma nova senha"
                                value={formValues.senha || ""}
                                onChange={handleInputChange}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute top-[75%] right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                            >
                                <i className={`pi ${showPassword ? 'pi-eye-slash' : 'pi-eye'}`}></i>
                            </button>
                        </div>


                        <div className="mb-3 w-full">
                            <label htmlFor="tellConfig" className="block text-sm font-medium text-gray-700">Contato:</label>
                            <IMaskInput
                                className="form-control border rounded-md border-zinc-400 w-full p-2"
                                mask="+{55} (00) 00000-0000"
                                definitions={{ '0': /[0-9]/ }}
                                unmask={true}
                                type="text"
                                id="tellConfig"
                                name="telefone"
                                placeholder="Insira o telefone"
                                value={formValues.telefone || ""}
                                onAccept={(value: any) => setFormValues({ ...formValues, telefone: value })}
                                required
                            />
                        </div>

                        <div className="mb-3 w-full">
                            <label htmlFor="cnpjConfig" className="block text-sm font-medium text-gray-700">CNPJ:</label>
                            <IMaskInput
                                mask="00.000.000/0000-00"
                                definitions={{ '0': /[0-9]/ }}
                                unmask="typed"
                                type="text"
                                id="cnpjConfig"
                                name="cnpj"
                                placeholder="Insira o CNPJ"
                                value={formValues.cnpj || ""}
                                onChange={(e: any) => setFormValues({ ...formValues, cnpj: e.target.value })}
                                className="form-control rounded-md border border-zinc-400 w-full p-2"
                                required
                            />
                        </div>
                        <Messages className="text-4xl max-w-fit mt-3 overflow-hidden" ref={messagesRef} />
                    </div>



                    <div className="flex place-self-stretch mt-4 space-x-4 pt-3">
                        <button
                            type="button"
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                            onClick={handleSave}>
                            Salvar mudanças
                        </button>
                        <button
                            type="button"
                            className="bg-gray-300 text-black px-4 py-2 rounded"
                            onClick={handleCancel}>
                            Remover mudanças
                        </button>
                    </div>
                </div>
            </div>
            <PanelSidebar visible={sidebarVisible} setVisible={setSidebarVisible} />
        </div>
        </DefineApp>
</div>
    );
};