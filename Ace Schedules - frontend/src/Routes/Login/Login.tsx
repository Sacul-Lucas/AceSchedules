import { SetStateAction, useState } from 'react';
import etpcLogo from '../../assets/img/Logo_etpc.png';
import { AuthForm } from '../../Core/Components/Utils/AuthForm.tsx';
import '../../Core/Css/Owned/Auth.css'
import { ResponsePopup, handleAlert } from '../../Core/Components/Utils/ResponsePopup.tsx';
import { AuthUserAction } from '../../Core/Actions/AuthUserAction.ts';
import { defineApp } from '../../Core/Components/Utils/DefineApp.tsx';

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

    defineApp({
        cssPath: 'src/Core/Css/Owned/Auth.css',
        appTitle: 'Ace Schedules - Login',
        appIcon: 'https://cdn-icons-png.flaticon.com/512/9131/9131529.png'
    })

    return (
        <div>
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
                redirectLink='/Login' 
                title={error ? 'Erro' : 'Pronto!'} 
                description={error || success} 
            />

        </div>
    );
}