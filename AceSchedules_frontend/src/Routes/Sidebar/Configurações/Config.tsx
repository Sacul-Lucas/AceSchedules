import { useEffect, useState } from "react";
import { VisualizarActionConfig } from "../../../Core/Actions/VisualizarActionConfig";
import { useNavigate } from "react-router-dom";
import { IMaskInput } from "react-imask";
import { Avatar } from "primereact/avatar";
import { getInitials, stringToColor } from "../../../Core/Components/Utils/functions/Formatter";
import { Message } from 'primereact/message';
import { PanelBody } from "../../../Core/Components/Body/PanelBody";
import { API_BASE_URL } from "../../../Config";

export const Config = () => {
    const [selectedUser, setSelectedUser] = useState<any>();
    const [initialValues, setInitialValues] = useState<any>({});
    const [formValues, setFormValues] = useState<any>({});
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [fieldErrors, setFieldErrors] = useState<any>({});

    const navigate = useNavigate();

    const handleGetSelectedUser = async () => {
        const getSelectedUser = await VisualizarActionConfig.execute();

        switch (getSelectedUser.status) {
            case 'SUCCESS':
                setSelectedUser(getSelectedUser.data);
                setInitialValues(getSelectedUser.data);
                setFormValues(getSelectedUser.data);
                setError('');
                break;

            case 'USER_NOT_FOUND':
            case 'UNKNOWN':
                console.log("Erro ao obter usuário. Redirecionando para Login.");
                setSuccess('');
                navigate('/Login');
                break;

            default:
                setError('Não foi possível obter o tipo de usuário. Tente novamente mais tarde.');
                setSuccess('');
                break;
        }
    };

    const handleCancel = () => {
        setFormValues(initialValues);
    };

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
    
        // Remover o erro específico do campo
        setFieldErrors((prevErrors: any) => ({
            ...prevErrors,
            [name]: undefined,  // Limpa o erro específico
        }));
    
        setFormValues({ ...formValues, [name]: value });
    };
    
    const actionSave = async () => {
        try {
            const endpoint = `${API_BASE_URL}/userAuth/Editconfig`;
            const { usuario, email, senha, telefone, cnpj } = formValues;
    
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ usuario, email, senha, telefone, cnpj }),
            });
    
            const result = await response.json();
    
            setError('');
            setSuccess('');
    
            if (result.success) {
                setSuccess(result.message);
                handleGetSelectedUser();
            } else {
                setFieldErrors(result.errors || {});
                setError(result.message || 'Erro ao salvar usuário.');
            }
        } catch (error) {
            setError('Erro ao salvar usuário.');
        }
    };

    useEffect(() => {
        handleGetSelectedUser();
    }, []);

    return (
        <PanelBody>
            <div className="flex h-[60vh] w-[100%] place-items-center place-content-center">
                <div className="mt-4 rounded-md border-2 flex !p-0 place-self-center size-52 w-[60vw] h-[50vh]">
                    <div className="min-w-[12vw] max-w-fit flex flex-col items-center h-full">
                        <div className="flex flex-col items-center justify-center pr-4 pl-4 pt-5 ">
                            <Avatar
                                className="w-24 h-24 text-white text-3xl"
                                label={getInitials(selectedUser?.usuario)}
                                shape="circle"
                                style={{ backgroundColor: stringToColor(formValues.usuario || '') }}
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
                        <h2 className="font-weight-bold py-3 mb-4 text-xl">Configurações de conta</h2>
                        <div className="!grid grid-rows-3 grid-flow-col gap-4 w-full h-1/2">
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
                                {fieldErrors.usuario && <Message severity="error" text={fieldErrors.usuario}/>}                                                            
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
                                {fieldErrors.email && <Message severity ="error" text={fieldErrors.email} />}                             
                            </div>
                            <div className="mb-3 relative w-full">
                                <label htmlFor="senhaConfig" className="block text-sm font-medium text-gray-700">
                                    Mudar senha:
                                </label>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="senha"
                                    id="senhaConfig"
                                    className="form-control rounded-md border border-zinc-400 w-full p-2 pr-10"
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
                                {fieldErrors.senha && <Message severity ="error" text={fieldErrors.senha} />}                                                            
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
                                    onAccept={(value: any) => {
                                        setFormValues({ ...formValues, telefone: value });
                                        
                                        // Remover erro do campo ao aceitar um novo valor
                                        setFieldErrors((prevErrors: any) => ({
                                            ...prevErrors,
                                            telefone: undefined,  // Limpa o erro do campo telefone
                                        }));
                                    }}
                                    required
                                />
                                {fieldErrors.telefone && <Message severity ="error" text={fieldErrors.telefone} />}                                                                               
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
                                    className="form-control border rounded-md border-zinc-400 w-full p-2"
                                    value={formValues.cnpj || ""}
                                    onAccept={(value: any) => setFormValues({ ...formValues, cnpj: value })}
                                    onChange={handleInputChange}
                                    required
                                />
                                {fieldErrors.cnpj && <Message severity ="error" text={fieldErrors.cnpj} />}                                                                                                  
                            </div>
                            <div className="relative">
                                {success && <Message className="absolute text-4xl w-fit mt-[1.2rem] overflow-hidden custom-messages" severity="success" text={success} />}
                                {error && <Message className="absolute text-4xl w-fit mt-[1.2rem] overflow-hidden custom-messages" severity="error" text={error} />}
                            </div>
                            
                        </div>
                        <div className="flex place-self-stretch mt-4 space-x-4 pt-3">
                            <button
                                type="button"
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                                onClick={actionSave}>
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
            </div>
        </PanelBody>
    );
};