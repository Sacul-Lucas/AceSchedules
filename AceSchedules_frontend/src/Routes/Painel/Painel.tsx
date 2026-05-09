import { PanelLayout } from "../../Core/Components/Layout/PanelLayout";
import { Card } from "../../Core/Components/Cards/Card";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../Config";

import painelStyles from "../../Core/Css/Owned/Painel.module.css";
import appCalendarIcon from "../../assets/icons/calendar-alt-solid.svg";

export const Painel = () => {
    const [salas, setSalas] = useState<any[]>([])
    const [loading, setLoading] = useState(false); 

    const loadSalas = async () => {
        setLoading(true)

        try {
            const response = await fetch(`${API_BASE_URL}/adminPaths/Salas`, {credentials: 'include'});
            if (response.ok) {
                const data = await response.json();
                setSalas(data.salas);
            } else {
                console.error("Erro ao carregar dados das salas:", response.statusText);
            }
        } catch (error) {
            console.error("Erro ao carregar dados das salas:", error);
        }
        setLoading(false)
    };

    useEffect(() => {
        loadSalas();
    }, []);

    return (
        <PanelLayout layoutTitle="Ace Schedules - Painel" layoutIcon={appCalendarIcon}>
            <div className={painelStyles.col}>
                <h1 className={`lg:!text-[6vw] lg:!pt-9 ${painelStyles.panelTitle}`}>Salas Disponíveis</h1>
                <p className="lg:!text-[1.4vw]">
                    Nossa plataforma de agendamento de salas simplifica a reserva de espaços para reuniões, <br />
                    eventos e atividades, proporcionando conveniência e eficiência para todos os usuários.
                </p>
                <h6 className={`lg:!text-[1.3vw] lg:!pt-[40px] ${painelStyles.intDescription}`}>
                    Clique em reservar para realizar um pedido de agendamento
                </h6>
                <div className={`lg:!gap-0 lg:!grid-cols-[repeat(4,_0fr)] ${painelStyles.cardsGrid}`}>
                    {!loading && salas.length > 0 && salas.map(sala => (
                        <Card
                            key={sala.id}
                            imgSrc={`${API_BASE_URL}/uploads/salas/${sala.backImg}`}
                            title={sala.nome}
                            description={sala.descricao}
                            características={sala.caracteristicas || []}
                            salaAlocada={sala.id}
                        />
                    ))}


                    {loading && (
                        Array.from({ length: 4 }).map((_, index) => (
                            <div key={index} className={`${painelStyles.card} lg:!w-[17vw] 2xl:!w-[13vw] lg:!h-[40dvh] lg:!m-[4rem_1.5rem_0_1.5rem] animate-pulse`} >
                                <div className="bg-gray-300 w-full h-full rounded-md mb-4" />
                            </div>
                        ))
                    )}
                </div>
            </div>
        </PanelLayout>
    )
}