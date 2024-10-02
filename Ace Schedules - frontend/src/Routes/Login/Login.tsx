import { SetStateAction, useState } from 'react';
import { AuthForm } from '../../Core/Components/Forms/AuthForm.tsx';
import { ResponsePopup, handleAlert } from '../../Core/Components/Pop-ups/ResponsePopup.tsx';
import { AuthUserAction } from '../../Core/Actions/AuthUserAction.ts';
import { DefineApp } from '../../Core/Components/Utils/DefineApp.tsx';
import etpcLogo from '../../assets/img/Logo_etpc.png';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [usertype, setUserType] = useState('Empresa');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        const authRes = await AuthUserAction.execute({
            email,
            senha,
            usertype
        })

        const message = authRes.data

        switch (authRes.status) {
            case 'SUCCESS':
                setSuccess(message);
                setError('');
              break;
      
            case 'EMAIL_NOT_FOUND':
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
        }, 50)
    };


    return (
        <DefineApp cssPath='src/Core/Css/Owned/Auth.css' appTitle='Ace Schedules - Login' appIcon='src/assets/icons/user-circle-solid.svg' isCssEquiv={true}>
            <div id="logoETPC" className="logoETPC lg:!max-w-[21%] lg:!ml-[78%] sm:!max-w-[45%] sm:!ml-[55%]">
                <img src={etpcLogo} className="animate-[2s_showUp_ease-in] transition-all" />
            </div>
            <AuthForm 
                formId={'Login'}
                formAction={handleSubmit}
                formBttTitle={'Entrar'}
                formMethod={'POST'}
                emailAction={(e: { target: { value: SetStateAction<string>; }; }) => setEmail(e.target.value)}
                senhaAction={(e: { target: { value: SetStateAction<string>; }; }) => setSenha(e.target.value)}
                typeAction={(e: { target: { value: SetStateAction<string>; }; }) => setUserType(e.target.value)} 
            />
            
            <ResponsePopup 
                type={error ? 'error' : 'success'} 
                redirectLink={error ? '/Login' : '/Painel'}
                title={error ? 'Erro' : 'Pronto!'} 
                description={error || success} 
            />
        </DefineApp>
    );
}