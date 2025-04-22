import { SetStateAction, useState } from 'react';
import { AuthForm } from '../../Core/Components/Forms/AuthForm.tsx';
import { handleAlert, ResponsePopup } from '../../Core/Components/Pop-ups/ResponsePopup.tsx';
import { DefineApp } from '../../Core/Components/Utils/DefineApp.tsx';
import { RegisterUserAction } from '../../Core/Actions/RegisterUserAction.ts';
import authStyles from "../../Core/Css/Owned/Auth.module.css";
import etpcLogo from '../../assets/img/Logo_etpc.png';
import appIcon from '../../assets/icons/user-circle-solid.svg';

export const Cadastro = () => {
    const [usuario, setUser] = useState('');
    const [telefone, setTel] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [usertype, setUserType] = useState('Empresa');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        const regRes = await RegisterUserAction.execute({
            usuario,
            telefone,
            cnpj,
            email,
            senha,
            usertype
        });

        const message = regRes.data;

        switch (regRes.status) {
            case 'SUCCESS':
                setSuccess(message);
                setError('');
                break;

            case 'EMAIL_ALREADY_EXISTS':
                setError(message);
                setSuccess('');
                break;

            case 'UNKNOWN':
                setError(message);
                setSuccess('');
                break;

            default:
                setError('Não foi possível fazer login no momento. Tente novamente mais tarde.');
                setSuccess('');
                break;
        }

        setTimeout(() => {
            handleAlert();
        }, 50);
    };

    return (
        <DefineApp appIcon={appIcon} appTitle='Ace Schedules - Cadastro' bodyStyle={authStyles.AuthBody}>
            <div className={`${authStyles.logoETPC} lg:!max-w-[21%] lg:!ml-[78%] sm:!max-w-[45%] sm:!ml-[55%]`}>
                <img src={etpcLogo} className="animate-[2s_showUp_ease-in] transition-all" alt="Logo ETPC" />
            </div>

            <AuthForm
                formId={'Cadastro'}
                formAction={handleSubmit}
                formBttTitle={'Criar conta'}
                formMethod={'POST'}
                userAction={(e: { target: { value: SetStateAction<string>; }; }) => setUser(e.target.value)}
                telAction={(e: { target: { value: SetStateAction<string>; }; }) => setTel(e.target.value!)}
                cnpjAction={(e: { target: { value: SetStateAction<string>; }; }) => setCnpj(e.target.value)}
                emailAction={(e: { target: { value: SetStateAction<string>; }; }) => setEmail(e.target.value)}
                senhaAction={(e: { target: { value: SetStateAction<string>; }; }) => setSenha(e.target.value)}
                typeAction={(e: { target: { value: SetStateAction<string>; }; }) => setUserType(e.target.value)}
            />

            <ResponsePopup
                type={error ? 'error' : 'success'}
                redirectLink={error ? '/' : '/Login'}
                title={error ? 'Erro' : 'Pronto!'}
                description={error || success}
            />
        </DefineApp>
    );
};
