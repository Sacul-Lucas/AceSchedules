import { ReactNode, useEffect, useState } from "react";
import { DefineApp } from "../Utils/DefineApp";
import { Footer } from "../Footer/Footer";

import panelBodyStyles from '../../Css/Owned/Painel.module.css';
import enfeite1 from '../../../assets/img/enfeite1.png';
import enfeite2 from '../../../assets/img/enfeite2.png';

interface PanelLayoutProps {
    layoutIcon: string,
    layoutTitle: string,
    children: ReactNode;
}

export const PanelLayout: React.FC<PanelLayoutProps> = ({ 
    layoutIcon,
    layoutTitle,
    children
}) => { 
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
      const hasVisited = sessionStorage.getItem('visited');
      if (!hasVisited) {
        setAnimate(true);
        sessionStorage.setItem('visited', 'true');
      }
    }, []);



    return (
        <DefineApp
          bodyStyle={`bg-[#f8f9fa] ${animate ? "transition-opacity duration-500 opacity-100" : ""}`}
          appIcon={layoutIcon}
          appTitle={layoutTitle}
        >
            <main className={`w-full ${panelBodyStyles.panelBody}`}>

                <div className={`${panelBodyStyles.enfeite1} ${animate ? "animate-[500ms_lineDown_ease-in]" : ""}`}>
                    <img src={enfeite1} alt="" />
                </div>

                <div className={panelBodyStyles.cardContainer}>
                    <div className={`${panelBodyStyles.row} ${animate ? "animate-[2s_showUp_ease-in]" : ""}`}>
                        {children}
                    </div>
                </div>

                <div className={`${panelBodyStyles.enfeite2} ${animate ? "animate-[500ms_lineUp_ease-out]" : ""}`}>
                  <img src={enfeite2} alt="" />
                </div>

                <Footer canAnimate={animate} />
            </main>
        </DefineApp>
    )
}