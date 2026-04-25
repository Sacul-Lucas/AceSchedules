import { FaInstagram, FaLinkedin, FaSquareFacebook } from "react-icons/fa6"
import moment from 'moment';
import footerStyles from '../../Css/Owned/Painel.module.css';
import logoFooterWhite from '../../../assets/img/logo-footer-white.png';
import logoAce from '../../../assets/img/Logo - Ace Schedules.jpg';

interface FooterProps {
    canAnimate: boolean
}

export const Footer: React.FC<FooterProps> = ({ 
    canAnimate
}) => {
    return (
        <footer id="footer" className={`${canAnimate ? "animate-[2s_showUp_ease-in]" : ""} transition-all ${footerStyles.footer}`}>
            <div className={footerStyles.rodapeContent}>
                <div className={`lg:!w-[100%] ${footerStyles.contatosEtpc}`}>
                    <div className={`lg:!w-[30%] ${footerStyles.primeiraColuna}`}>
                        <div className={footerStyles.logo}>
                            <img 
                                src={logoFooterWhite}
                                className={`lg:!w-[8vw] ${footerStyles.contatosLogo}`} 
                                title="etpcWhiteLogo"
                            />
                        </div>

                        <div className={footerStyles.contatosSub}>
                            <h4 className="lg:!text-base">RECEBA INFORMAÇÕES DA ESCOLA</h4>

                            <div className={footerStyles.inputContato}>
                                <input 
                                    type="text" 
                                    placeholder="Email" 
                                    id="email" 
                                    autoComplete="off" 
                                    className="lg:!w-[15vw]"
                                />
                                <h3 className="lg:!text-base">OK</h3>
                            </div>

                            <div className={footerStyles.restoContatos}>
                                <h4 className="lg:!text-base">CONTATO</h4>

                                <div className={`lg:!text-[0.85rem] ${footerStyles.restoContatosSub}`}>
                                    <span>Telefone: (24) 3340-5400</span>
                                    <span>WhastsApp: (24) 3340-5412</span>
                                    <span>Email: secretaria.etpc@csn.com.br</span>

                                    <h3 className="lg:!text-base">
                                        R. Sessenta e Dois, 90 - Sessenta,<br />
                                        Volta Redonda - RJ
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={`lg:!text-[0.85rem] ${footerStyles.segundaColunaLinks}`}>
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

                    <div className={`lg:!text-[0.85rem] ${footerStyles.segundaColunaLinks}`}>
                        <a href="https://etpc.com.br/noticias/">NOTÍCIAS</a>
                        <a href="https://etpc.com.br/noticias/matriculas/">MATRÍCULAS</a>
                    </div>

                    <div className={footerStyles.terceiraColunaSocial}>
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

            <div className={footerStyles.footerTag}>
                <div className={`lg:!w-[90%] ${footerStyles.tagContent}`}>
                    <div className={footerStyles.etpcDireitos}>
                        <p className="lg:!text-[0.65rem]">
                            Política de privacidade // &copy; {moment().year()} ETPC - Todos os direitos reservados
                        </p>
                    </div>

                    <div className={footerStyles.logoAce}>
                        <img 
                            src={logoAce}
                            className="rounded-full lg:!w-[4vw]" 
                            title="aceschedulesLogo" 
                        />
                    </div>

                    <span className="lg:!text-[0.65rem]">Projeto Ace Schedules - Desenvolvido por Alunos da ETPC</span>
                </div>
            </div>
        </footer>
    )
}
