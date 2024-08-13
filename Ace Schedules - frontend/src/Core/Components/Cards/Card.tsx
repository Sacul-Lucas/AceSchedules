import Carousel from 'react-bootstrap/Carousel';

interface PanelCardProps {
    Capacidade?: number | null;
    Características?: [] | undefined;
    imgSrc?: string | undefined;
    hascarousel?: boolean;
}


export const Card: React.FC<PanelCardProps> = ({ 
    Capacidade = undefined,
    Características = undefined,
    imgSrc = undefined,
    hascarousel = false
}) => {

    let isMobile: boolean = false;

    if (window.innerWidth <= 1024) {
        isMobile = true;
    }

    if (isMobile) {
        return (
            <div>
                <div className="card card1 lg:!w-[13vw] lg:!h-[40dvh]" id="card1">
                    <h5 className="lg:!text-xl">Auditório</h5>
                </div>
                
                <div className="card card2 lg:!w-[13vw] lg:!h-[40dvh]" id="card2">
                    <h5 className="lg:!text-xl">Sala 106</h5>
                </div>
    
                <div className="card card3 lg:!w-[13vw] lg:!h-[40dvh]" id="card3">
                    <h5 className="lg:!text-xl">Sala 128</h5>
                </div>
    
                <div className="card card4 lg:!w-[13vw] lg:!h-[40dvh]" id="card4">
                    <h5 className="lg:!text-xl">Sala 129</h5>
                </div>
            </div>
        )

    } else {
        return (
            <div>
                <div className="card card1 lg:!w-[13vw] lg:!h-[40dvh]" id="card1">
                    <h5 className="lg:!text-xl">Auditório</h5>
                </div>
                
                <div className="card card2 lg:!w-[13vw] lg:!h-[40dvh]" id="card2">
                    <h5 className="lg:!text-xl">Sala 106</h5>
                </div>
    
                <div className="card card3 lg:!w-[13vw] lg:!h-[40dvh]" id="card3">
                    <h5 className="lg:!text-xl">Sala 128</h5>
                </div>
    
                <div className="card card4 lg:!w-[13vw] lg:!h-[40dvh]" id="card4">
                    <h5 className="lg:!text-xl">Sala 129</h5>
                </div>
            </div>
        )
    }
}