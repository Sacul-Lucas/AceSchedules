import { useNavigate } from "react-router-dom";
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa6";

export const Navbar = () => {

    const navigate = useNavigate();

    const goToETPC = () => {
        navigate('https://etpc.com.br/')
    }
    
    return (
        <div>
            <header>
                <div className="navbar">
                    <a href="https://fundacaocsn.org.br/"><img src="src/assets/img/logo-fundacao-csn.png.png" className="logo lg:!w-[12vw]"/></a>
                </div>
        
                <div className="flex align-middle sub-bar">

                    <div className="listmenu" id="listmenu">
                        <button onClick={goToETPC} className="barrmenulink" id="barrmenulink1"> Home</button>
                        <a href="#footer"><button className="barrmenulink" id="barrmenulink2"> Contato</button></a>
                        <button form="logoutform" className="barrmenulink" id="barrmenulink3" name="logout"> Sair</button>
                        <form id="logoutform" action="logout.php" method="GET"></form>
                    </div>

                    <div className="container1 lg:!ml-8">
                        <div className="bar1 lg:!w-[2.5vw] lg:!min-h-[0.6dvh]"></div>
                        <div className="bar2 lg:!w-[2.5vw] lg:!min-h-[0.6dvh]"></div>
                        <div className="bar3 lg:!w-[2.5vw] lg:!min-h-[0.6dvh]"></div>
                    </div>
        
                    <a href="https://etpc.com.br/" className="absolute"><img src="src/assets/img/logo.png" className="logo2 lg:!w-[7vw]"/></a>
        
                    <div className="flex flex-row h-auto gap-[5vw] lg:!gap-[2.5dvw] ml-auto items-center subbarLinks">
                        <p className="lg:!text-[1vw] lg:!h-auto lg:!pr-[8%]">QUEM SOMOS</p>
        
                        <ul className="barSocial">
                            <li>
                                <a href="https://instagram.com/aceschedules?igshid=MzRlODBiNWFlZA==">
                                    <i className="fa-brands fa-instagram lg:!w-[25%] lg:!text-[2.3vw]">
                                        <FaInstagram/>
                                    </i>
                                </a>
                            </li>
                            <li>
                                <a href="https://br.linkedin.com/school/escola-tecnica-pandia-calogeras/">
                                    <i className="fa-brands fa-linkedin lg:!w-[25%] lg:!text-[2.3vw]">
                                        <FaLinkedin/>
                                    </i>
                                </a>
                            </li>
                            <li>
                                <a href="https://github.com/Sacul-Lucas/AceSchedule">
                                    <i className="fa-brands fa-github lg:!w-[25%] lg:!text-[2.3vw]">
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