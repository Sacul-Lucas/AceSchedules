import { FaInstagram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa6";

interface NavSidebarProps {
    showSidebar: () => void,
}

export const Navbar: React.FC<NavSidebarProps> = ({ 
    showSidebar
}) => {    
    return (
        <div>
            <header>
                <div className="navbar">
                    <a href="https://fundacaocsn.org.br/"><img src="src/assets/img/logo-fundacao-csn.png.png" className="logo lg:!w-[12vw]" title="csnLogo"/></a>
                </div>
        
                <div className="flex align-middle sub-bar">

                    <div className="container1 lg:!ml-8" onClick={showSidebar}>
                        <div className="bar1 lg:!w-[2.5vw] lg:!min-h-[0.6dvh]"></div>
                        <div className="bar2 lg:!w-[2.5vw] lg:!min-h-[0.6dvh]"></div>
                        <div className="bar3 lg:!w-[2.5vw] lg:!min-h-[0.6dvh]"></div>
                    </div>
        
                    <a href="https://etpc.com.br/" className="absolute"><img src="src/assets/img/logo.png" className="logo2 lg:!w-[7vw]" title="etpcBlueLogo"/></a>
        
                    <div className="lg:!gap-16 lg:!mr-4 subbarLinks">
                        <p className="lg:!text-[1vw] lg:!h-auto">QUEM SOMOS</p>
        
                        <ul className="barSocial lg:!gap-2 lg:!text-[2.3vw]">
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
        </div>
    )
}