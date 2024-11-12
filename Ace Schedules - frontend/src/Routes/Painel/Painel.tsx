import { Card } from "../../Core/Components/Cards/Card";
import { useEffect, useState } from "react";
import { PanelBody } from "../../Core/Components/Body/PanelBody";

export const Painel = () => {
    const [salas, setSalas] = useState<any[]>([])

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
        <PanelBody>
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
                            imgSrc={`/src/assets/img_salas/${sala.backImg}`}
                            title={sala.nome}
                            description={sala.descricao}
                            características={sala.caracteristicas || []}
                            salaAlocada={sala.id}
                        />
                    ))}
                </div>
            </div>
        </PanelBody>
    )
}