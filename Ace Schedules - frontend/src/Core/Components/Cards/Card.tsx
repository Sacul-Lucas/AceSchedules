import { useState, useRef } from 'react';
import { CardModal } from '../Modals/cardModal.tsx';
import { formatCaracteristicas } from '../Utils/Formatter.ts';

interface PanelCardProps {
    características?: string;
    imgSrc: string;
    title?: string | undefined;
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

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const descriptionHeight = descriptionRef.current ? descriptionRef.current.clientHeight : 0;
    let titleHeightPercentage: number = 1.28;
    const titleStyle = {
        maxHeight: isHovered ? `${descriptionHeight * titleHeightPercentage}px` : '12%',
        transition: 'max-height 0.3s ease-in-out',
    };

    return (
        <div>
            <div className='card lg:!w-[17vw] 2xl:!w-[13vw] lg:!h-[50dvh] lg:!m-[4rem_1.5rem_0_1.5rem]' id='card' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <img src={`${imgSrc}`} className="w-full h-full rounded-xl"/>
                <h5 className="lg:!text-xl" id='card-title' style={titleStyle}>{title}</h5>
                <div className="relative flex items-center justify-center lg:!bottom-28 xsm:!bottom-[4.65rem]">
                    <div className='card-description lg:!gap-[0.25rem]' id='card-description' ref={descriptionRef}>
                        <div className="card-custom-scrollbar overflow-auto justify-center items-center flex lg:!max-h-[4.5rem] lg:!min-h-[4.5rem] xsm:!max-h-[2.5rem] xsm:!min-h-[2.5rem]">
                            <p className="lg:!text-[0.65rem] lg:!p-0">
                              {description}
                            </p>
                        </div>
                        <button className="lg:!text-[0.65rem] lg:!p-[8px_0]" onClick={openModal}>Reservar</button>
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
    )
}
