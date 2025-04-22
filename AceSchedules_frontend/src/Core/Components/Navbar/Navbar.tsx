import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa6";
import navbarStyles from '../../Css/Owned/Painel.module.css';
import logoCsn from '../../../assets/img/logo-fundacao-csn.png.png';
import logoBlueEtpc from '../../../assets/img/logo.png';

interface NavSidebarProps {
    showSidebar: () => void,
    isSidebarVisible?: boolean 
}

export const Navbar: React.FC<NavSidebarProps> = ({ 
    showSidebar,
    isSidebarVisible
}) => {    
    return (
        <header>
            <div className={navbarStyles.navbar}>
                <a href="https://fundacaocsn.org.br/">
                    <img 
                        src={logoCsn}
                        className={`lg:!w-[12vw] ${navbarStyles.logo}`} 
                        title="csnLogo"
                    />
                </a>
            </div>

            <div className={`flex align-middle ${navbarStyles.subBar}`}>

                <div 
                    className={`lg:!ml-8 transition-all delay-150 ${navbarStyles.container1} ${isSidebarVisible ? 'opacity-0 invisible' : 'opacity-100 visible'}`} 
                    onClick={showSidebar}
                >
                    <div className={`lg:!w-[2.5vw] lg:!min-h-[0.6dvh] ${navbarStyles.bar1}`}></div>
                    <div className={`lg:!w-[2.5vw] lg:!min-h-[0.6dvh] ${navbarStyles.bar2}`}></div>
                    <div className={`lg:!w-[2.5vw] lg:!min-h-[0.6dvh] ${navbarStyles.bar3}`}></div>
                </div>

                <a href="https://etpc.com.br/" className="absolute">
                    <img 
                        src={logoBlueEtpc}
                        className={`lg:!w-[7vw] ${navbarStyles.logo2}`} 
                        title="etpcBlueLogo"
                    />
                </a>

                <div className={`lg:!gap-16 lg:!mr-4 ${navbarStyles.subbarLinks}`}>
                    <p className="lg:!text-[1vw] lg:!h-auto">QUEM SOMOS</p>

                    <ul className={`lg:!gap-2 lg:!text-[2.3vw] ${navbarStyles.barSocial}`}>
                        <li>
                            <a href="https://instagram.com/aceschedules?igshid=MzRlODBiNWFlZA==">
                                <i className="fa-brands fa-instagram lg:!w-[25%]">
                                    <FaInstagram/>
                                </i>
                            </a>
                        </li>
                        <li>
                            <a href="https://br.linkedin.com/school/escola-tecnica-pandia-calogeras/">
                                <i className="fa-brands fa-linkedin lg:!w-[25%]">
                                    <FaLinkedin/>
                                </i>
                            </a>
                        </li>
                        <li>
                            <a href="https://github.com/Sacul-Lucas/AceSchedule">
                                <i className="fa-brands fa-github lg:!w-[25%]">
                                    <FaGithub/>
                                </i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    )
}
