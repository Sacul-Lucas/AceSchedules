import { Card } from "../../Core/Components/Cards/Card";
import '../../Core/Css/Owned/Painel.css'
import { defineApp } from "../../Core/Components/Utils/DefineApp";
import { Navbar } from "../../Core/Components/Navbar/Navbar";
import { Footer } from "../../Core/Components/Footer/Footer";

export const Painel = () => {

    defineApp({
        cssPath: 'src/Core/Css/Owned/Painel.css',
        appTitle: 'Ace Schedules - Painel',
        appIcon: 'src/assets/icons/calendar-alt-solid.svg'
    })
      
    return (
        <div>
            <Navbar/>

            <div className="background-effects">

            </div>

            <div className="card-container">
                <div className="enfeite1">
                        <img src="src/assets/img/enfeite1.png" alt=""/>
                </div>
                <div className="row">
                    <div className="flex flex-col col">
                        <h1 className="lg:!text-[6vw] lg:!mt-9">Salas Disponíveis</h1>
                        <p className="lg:!text-[1.4vw]">
                            Nosso site de agendamento de salas simplifica a reserva de espaços para reuniões, <br></br>eventos e atividades,
                            proporcionando conveniência e eficiência para todos os usuários.
                        </p>
                        <h6 className="lg:!text-[1.3vw] lg:!pt-[40px]">Clique em uma sala para realizar um pedido de agendamento</h6>
                        <Card/>
                    </div>
                </div>
                <div className="enfeite2">
                    <img src="src/assets/img/enfeite2.png" alt=""/>
                </div>
            </div>
            
            <div className="background-effects">
                {/* <div className="enfeite1">
                        <img src="src/assets/img/enfeite1.png" alt=""/>
                </div> */}

            </div>

            <Footer/>
        </div>
    )
}