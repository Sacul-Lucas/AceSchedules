import { Card } from "../../Core/Components/Cards/Card";
import { DefineApp } from "../../Core/Components/Utils/DefineApp";
import { Navbar } from "../../Core/Components/Navbar/Navbar";
import { Footer } from "../../Core/Components/Footer/Footer";

export const Painel = () => {
    return (
        <DefineApp cssPath="src/Core/Css/Owned/Painel.css" appIcon="src/assets/icons/calendar-alt-solid.svg" appTitle="Ace Schedules - Painel">
            <Navbar/>
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
                            <Card 
                                imgSrc={'/src/assets/img_salas/pic2.jpeg'}
                                title="Sala 128"
                                description="Sala usada para aulas, apresentações e reuniões. Pode incluir equipamentos como projetor, microfone, 
                                caixas de som e etc... (verifique se a sala possui os equipamentos desejados no momento anterior à reserva)"
                                características={['Projetor', 'Computador', 'Microfone', 'Quadro']}
                            />
                            <Card 
                                imgSrc={'/src/assets/img_salas/pic4.jpeg'}
                                title="Sala 129"
                                description="Sala usada para aulas, apresentações e reuniões. Pode incluir equipamentos como projetor, microfone, 
                                caixas de som e etc... (verifique se a sala possui os equipamentos desejados no momento anterior à reserva)"
                                características={['Projetor', 'Computador', 'Microfone', 'Caixas de som']}
                            />
                            <Card 
                                imgSrc={'/src/assets/img_salas/pic2.jpeg'}
                                title="Sala 130"
                                description="Sala usada para aulas, apresentações e reuniões. Pode incluir equipamentos como projetor, microfone, 
                                caixas de som e etc... (verifique se a sala possui os equipamentos desejados no momento anterior à reserva)"
                            />
                            <Card 
                                imgSrc={'/src/assets/img_salas/pic5.jpeg'}
                                title="Auditório"
                                description="Espaço utilizado para palestras, apresentações e eventos. Pode incluir equipamentos como projetor, microfone, 
                                caixas de som e etc... (verifique se a sala possui os equipamentos desejados no momento anterior à reserva)"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="enfeite2">
                <img src="src/assets/img/enfeite2.png" alt=""/>
            </div>
            <Footer/>
        </DefineApp>
    )
}