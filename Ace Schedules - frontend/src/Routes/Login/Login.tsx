import { SetStateAction, useEffect, useState } from 'react';
import etpcLogo from '../../assets/img/Logo_etpc.png';
import { AuthForm } from '../../Core/Components/Utils/AuthForm.tsx';
import '../../Core/Css/Owned/Auth.css'
import axios from 'axios'
import { ResponsePopup, handleAlert } from '../../Core/Components/Utils/ResponsePopup.tsx';

export const Login = () => {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [usertype, setusertype] = useState('Empresa');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [popupState, setPopupState] = useState<'success' | 'error' | null>(null);

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        try {
            await axios.post('/api/userAuth/login', {
                email,
                senha,
                usertype
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then((res) => {
                if (res.data.success) {
                    setSuccess('Login realizado com sucesso!');
                    setPopupState('success');
                } else {
                    setError('Email, senha e/ou tipo de usuário incorretos');
                    setPopupState('error');
                }
            });
        } catch (error) {
            console.error('Erro:', error);
            setError('Erro de conexão');
            setPopupState('error');
        }
        handleAlert()
    };

    useEffect(() => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'src/Core/Css/Owned/Auth.css';
        document.head.appendChild(link);

        document.title = 'Ace Schedules - Login';
        const mainFavicon = document.getElementById('mainFavicon') as HTMLLinkElement;
        if (mainFavicon) {
            mainFavicon.href = 'https://cdn-icons-png.flaticon.com/512/9131/9131529.png';
        }

        return () => {
            document.head.removeChild(link);
        };
    }, []);


    return (
        <body>
            <div id="logoETPC" className="logoETPC lg:!max-w-[21%] lg:!ml-[78%] sm:!max-w-[45%] sm:!ml-[55%]">
                <img src={etpcLogo} className="animate-[2s_showUp_ease-in] transition-all" />
            </div>
            <AuthForm 
                formId={'Login'} 
                formAction={handleSubmit} 
                title={'Login'} 
                formBttTitle={'Entrar'} 
                formType={'Login'} 
                formMethod={'POST'}
                emailAction={(e: { target: { value: SetStateAction<string>; }; }) => setEmail(e.target.value)} 
                senhaAction={(e: { target: { value: SetStateAction<string>; }; }) => setSenha(e.target.value)} 
                typeAction={(e: { target: { value: SetStateAction<string>; }; }) => setusertype(e.target.value)}
            />
            {popupState === 'error' && (
                <ResponsePopup type='error' redirectLink='' title='Erro' description={error}/>
            )}
            {popupState === 'success' && (
                <ResponsePopup type='success' redirectLink='' title={'Pronto!'} description={success}/> 
            )}

        </body>
    )
}