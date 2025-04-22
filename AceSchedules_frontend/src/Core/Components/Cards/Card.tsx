import { useState, useRef } from 'react';
import { CardModal } from '../Modals/cardModal.tsx';
import { formatCaracteristicas } from '../Utils/functions/Formatter.ts';
import cardStyles from '../../Css/Owned/Painel.module.css';

interface PanelCardProps {
    características?: string;
    imgSrc: string;
    title?: string;
    description?: string;
    salaAlocada: number;
}

export const Card: React.FC<PanelCardProps> = ({
    características = '',
    imgSrc,
    title,
    description = '',
    salaAlocada,
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const descriptionRef = useRef<HTMLDivElement>(null);

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const descriptionHeight = descriptionRef.current ? descriptionRef.current.clientHeight : 0;

    const titleStyle = {
        maxHeight: isHovered ? `${descriptionHeight * 1.28}px` : '12%',
        transition: 'max-height 0.3s ease-in-out',
    };

    return (
        <div>
            <div
                className={`${cardStyles.card} lg:!w-[17vw] 2xl:!w-[13vw] lg:!h-[40dvh] lg:!m-[4rem_1.5rem_0_1.5rem]`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <img src={imgSrc} className="w-full h-full rounded-xl" />
                <h5 className={`lg:!text-xl ${cardStyles.cardTitle}`} id='card-title' style={titleStyle}>
                    {title}
                </h5>

                <div className={`relative flex items-center justify-center lg:!bottom-28 xsm:!bottom-[4.65rem]`}>
                    <div
                        className={`${cardStyles.cardDescription} lg:!gap-[0.25rem]`}
                        ref={descriptionRef}
                    >
                        <div className={`overflow-auto justify-center items-center flex lg:!max-h-[4.5rem] lg:!min-h-[4.5rem] xsm:!max-h-[2.5rem] xsm:!min-h-[2.5rem] ${cardStyles.cardCutomScrollbar}`}>
                            <p className="lg:!text-[0.65rem] lg:!p-0">{description}</p>
                        </div>
                        <button className="lg:!text-[0.65rem] lg:!p-[8px_0]" onClick={openModal}>
                            Reservar
                        </button>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <CardModal
                    cardCaracterísticas={formatCaracteristicas(características)}
                    cardTitle={title}
                    onClose={closeModal}
                    salaAlocada={salaAlocada}
                />
            )}
        </div>
    );
};
