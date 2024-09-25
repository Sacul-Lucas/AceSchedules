import { Card } from "../../Core/Components/Cards/Card";
import { DefineApp } from "../../Core/Components/Utils/DefineApp";
import { Navbar } from "../../Core/Components/Navbar/Navbar";
import { Footer } from "../../Core/Components/Footer/Footer";
import { useEffect, useState } from "react";
import { PanelSidebar } from "../../Core/Components/Sidebars/PanelSidebar";

export const Painel = () => {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [salas, setSalas] = useState<any[]>([])

    const toggleSidebar = () => {
        setSidebarVisible(prev => !prev);
    };

    const loadSalas = async () => {
        try {
            const response = await fetch('/api/adminPaths/Salas');
            if (response.ok) {
                const data = await response.json();
                setSalas(data.salas);
            } else {
                console.error("Erro ao carregar dados das salas:", response.statusText);
            }
        } catch (error) {
            console.error("Erro ao carregar dados das salas:", error);
        }
    };

    useEffect(() => {
        loadSalas();
    }, []);

    return (
        <div>
            <DefineApp cssPath="src/Core/Css/Owned/Painel.css" appIcon="src/assets/icons/calendar-alt-solid.svg" appTitle="Ace Schedules - Painel">
                <Navbar showSidebar={toggleSidebar}/>

                <div className="enfeite1">
                    <img src="src/assets/img/enfeite1.png" alt=""/>
                </div>

                <div className="card-container">
                    <div className="row">
                        <div className="col">
                            <h1 className="lg:!text-[6vw] lg:!mt-9">Salas Disponíveis</h1>
                            <p className="lg:!text-[1.4vw]">
                                Nossa plataforma de agendamento de salas simplifica a reserva de espaços para reuniões, <br></br>eventos e atividades,
                                proporcionando conveniência e eficiência para todos os usuários.
                            </p>
                            <h6 className="lg:!text-[1.3vw] lg:!pt-[40px]">Clique em reservar para realizar um pedido de agendamento</h6>
                            <div className="lg:!gap-0 lg:!grid-cols-[repeat(4,_0fr)] cards-grid">
                            {salas.length > 0 && salas.map(sala => (
                                    <Card
                                        key={sala.id}
                                        imgSrc={sala.id === 215 ? '/src/assets/img_salas/pic2.jpeg' : sala.id === 216 ? '/src/assets/img_salas/pic4.jpeg' : sala.id === 217 ? '/src/assets/img_salas/pic5.jpeg' : '/src/assets/img/etpc2.jpg'}
                                        title={sala.nome}
                                        description={sala.descricao}
                                        características={sala.caracteristicas || []}
                                        salaAlocada={sala.id}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="enfeite2">
                    <img src="src/assets/img/enfeite2.png" alt=""/>
                </div>

                <Footer/>
            </DefineApp>

            <PanelSidebar visible={sidebarVisible} setVisible={setSidebarVisible} />
        </div>
    )
}