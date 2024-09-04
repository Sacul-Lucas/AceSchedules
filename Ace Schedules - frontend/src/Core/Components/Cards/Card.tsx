import React, { useState, useRef } from 'react';

interface PanelCardProps {
    características?: any[] | undefined;  // Corrigi o tipo do array de características
    imgSrc: string;
    title?: string | undefined;
    description?: string;
}


export const Card: React.FC<PanelCardProps> = ({ 
    características = undefined,
    imgSrc,
    title,
    description = ''
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const descriptionRef = useRef<HTMLDivElement>(null);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const descriptionHeight = descriptionRef.current ? descriptionRef.current.clientHeight : 0
    let titleHeightPercentage: number;
    if (window.innerWidth >= 1024) {
        titleHeightPercentage = 1.28;
    } else {
        titleHeightPercentage = 1.2;
    }
    const titleStyle = {
        maxHeight: isHovered ? `${descriptionHeight * titleHeightPercentage}px` : '12%',
        transition: 'max-height 0.3s ease-in-out',
    };

    return (
        <div>
            <div className='card lg:!w-[13vw] lg:!h-[40dvh]' id='card' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <img src={`${imgSrc}`} className="w-full h-full rounded-xl"/>
                <h5 className="lg:!text-xl" id='card-title' style={titleStyle}>{title}</h5>
                <div className="relative flex items-center justify-center lg:!bottom-28 xsm:!bottom-[4.65rem]">
                    <div className='card-description lg:!gap-[0.25rem]' id='card-description' ref={descriptionRef}>
                        <div className="card-custom-scrollbar overflow-auto lg:!max-h-[4.5rem] lg:!min-h-[4.5rem] xsm:!max-h-[2.5rem] xsm:!min-h-[2.5rem]">
                            <p className="lg:!text-[0.65rem] lg:!p-0">
                              {description}
                            </p>
                        </div>
                        <button className="lg:!text-[0.65rem] lg:!p-[8px_0]">Reservar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}