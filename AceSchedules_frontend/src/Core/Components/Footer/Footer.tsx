import { FaInstagram } from "react-icons/fa6"
import { FaLinkedin } from "react-icons/fa6"
import { FaSquareFacebook } from "react-icons/fa6"
import { useNavigate } from "react-router-dom"
import moment from 'moment';

export const Footer = () => {
    const navigate = useNavigate();

    const goToSecret = () => {
        navigate('/src/Routes/Secret/Projeto nêmesis/1 Player/Projeto nêmesis.html');
    }
    
    return (
        <footer id="footer" className="animate-[2s_showUp_ease-in] transition-all">
            <div className="rodape-content">
                <div className="contatos-etpc lg:!w-[100%]">
                    <div className="primeira-coluna lg:!w-[30%]">
                        <div className="logo">
                            <img src="src/assets/img/logo-footer-white.png" className="contatos-logo lg:!w-[8vw]" title="etpcWhiteLogo"/>
                        </div>
        
                        <div className="contatos-sub">
                            <h4 className="lg:!text-base">RECEBA INFORMAÇÕES DA ESCOLA</h4>
        
                            <div className="input-contato">
                                <input type="text" placeholder="Email" id="email" autoComplete="off" className="lg:!w-[15vw]"/>
                                <h3 className="lg:!text-base">OK</h3>
                            </div>
        
                            <div className="resto-contatos">
                                <h4 className="lg:!text-base">CONTATO</h4>
        
                                <div className="resto-contatos-sub lg:!text-[0.85rem]">
                                    <span>Telefone: (24) 3340-5400</span>
        
                                    <span>WhastsApp: (24) 3340-5412</span>
        
                                    <span>Email: secretaria.etpc@csn.com.br</span>
        
                                    <h3 className="lg:!text-base">R. Sessenta e Dois, 90 - Sessenta,<br></br> Volta Redonda - RJ </h3>
                                </div>
                            </div>
        
                        </div>
                    </div>
        
                    <div className="segunda-coluna-links lg:!text-[0.85rem]">
                        <a href="https://etpc.com.br/">INÍCIO</a>
                        <a href="https://etpc.com.br/quemsomos/">QUEM SOMOS</a>
                        <a href="https://etpc.com.br/fundacao-csn/">FUNDAÇÃO CSN</a>
                        <a href="https://etpc.com.br/ensino-medio-com-curso-tecnico/">ENSINO MÉDIO + TÉCNICO</a>
                        <a href="https://etpc.com.br/curso-tecnico-subsequente/">CURSOS TÉCNICOS</a>
                        <a href="https://etpc.com.br/curso-rapido/">CURSOS RÁPIDOS</a>
                        <a href="https://etpc.com.br/extracurricular/cursos-teen/">CURSOS TEEN</a>
                        <a href="https://etpc.com.br/in-company/">IN COMPANY</a>
                        <a href="https://etpc.com.br/politica-de-privacidade/">POLÍTICA DE PRIVACIDADE</a>
                    </div>
        
                    <div className="segunda-coluna-links lg:!text-[0.85rem]">
                        <a href="https://etpc.com.br/noticias/">NOTÍCIAS</a>
                        <a href="https://etpc.com.br/noticias/matriculas/">MATRÍCULAS</a>
                    </div>
        
                    <div className="terceira-coluna-social">
                        <a href="https://www.instagram.com/ETPCVR/">                                    
                            <i>
                                <FaInstagram/>
                            </i>
                        </a>
                        <a href="https://www.facebook.com/ETPCVR/">                                    
                            <i>
                                <FaSquareFacebook/>
                            </i>
                        </a>
                        <a href="https://www.linkedin.com/school/escola-tecnica-pandia-calogeras/">                                   
                            <i>
                                <FaLinkedin/>
                            </i>
                        </a>
                    </div>
                </div>
            </div>
        
            <div className="footer-tag">
                <div className="tag-content lg:!w-[90%]">
                    <div className="etpc-direitos">
                        <p className="lg:!text-[0.65rem]">Política de privacidade // &copy; {moment().year()} ETPC - Todos os direitos reservados</p>
                    </div>
        
                    <div className="logo-ace">
                        <img src="src/assets/img/Logo - Ace Schedules.jpg" className="rounded-full lg:!w-[4vw]" title="aceschedulesLogo" onClick={goToSecret}/>
                    </div>
        
                    <span className="lg:!text-[0.65rem]">Projeto Ace Schedules - Desenvolvido por Alunos da ETPC</span>
        
                </div>
            </div>
        </footer>
    )
}