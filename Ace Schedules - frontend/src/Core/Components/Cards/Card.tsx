interface PanelCardProps {
    Características?: [] | undefined;
    imgSrc: string;
    title?: string | undefined;
    description?: string;
}


export const Card: React.FC<PanelCardProps> = ({ 
    Características = undefined,
    imgSrc,
    title,
    description = ''
}) => {
    return (
        <div className="items-center justify-center ">
            <div className={`card lg:!w-[13vw] lg:!h-[40dvh]`}>
                <img src={`${imgSrc}`} className="w-full h-full rounded-xl"/>
                <h5 className="lg:!text-xl">{title}</h5>
                <div className='card-description'>
                    <p>
                      {description}
                    </p>
                    <button>Reservar</button>
                </div>
            </div>
        </div>
    )
}