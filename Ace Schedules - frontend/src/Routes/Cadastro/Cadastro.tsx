import { useEffect } from 'react';
import etpcLogo from '../../assets/img/Logo_etpc.png';
import { AuthForm } from '../../Core/Components/Utils/AuthForm.tsx';
import '../../Core/Css/Owned/Auth.css'

export const Cadastro = () => {

    useEffect(() => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'src/Core/Css/Owned/Auth.css';
        document.head.appendChild(link);
    
        return () => {
            setTimeout(() => {
                document.head.removeChild(link);
            }, 250)
        };
    }, []);

    document.title = 'Ace Schedules - Cadastro'

    let mainFavicon = document.getElementById('mainFavicon') as HTMLBaseElement;
    if (mainFavicon) {
        mainFavicon.href = 'https://cdn-icons-png.flaticon.com/512/9131/9131529.png'
    }
    
    return (
        <body>
            <div id="logoETPC" className="logoETPC lg:!max-w-[21%] lg:!ml-[78%] sm:!max-w-[45%] sm:!ml-[55%]">
                <img src={etpcLogo} className="animate-[2s_showUp_ease-in] transition-all" />
            </div>
                <AuthForm formId={'Cadastro'} formAction={'cadastro.php'} title={'Cadastro'} formBttTitle={'Criar conta'} formType={'cadastro'} formMethod={'POST'} />
        </body>
    )
}