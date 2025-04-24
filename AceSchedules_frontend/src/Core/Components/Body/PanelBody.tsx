import { ReactNode, useEffect, useState } from "react";
import { Navbar } from "../Navbar/Navbar";
import { Footer } from "../Footer/Footer";
import { PanelSidebar } from "../Sidebar/PanelSidebar";
import { DefineApp } from "../Utils/DefineApp";
import appCalendarIcon from "../../../assets/icons/calendar-alt-solid.svg";
import panelBodyStyles from '../../Css/Owned/Painel.module.css';
import enfeite1 from '../../../assets/img/enfeite1.png';
import enfeite2 from '../../../assets/img/enfeite2.png';

interface PanelBodyProps {
  children: ReactNode;
}

export const PanelBody: React.FC<PanelBodyProps> = ({ children }) => {
  const [sidebarVisible, setSidebarVisible] = useState<boolean>(() => {
    const stored = localStorage.getItem('isSidebarVisible');
    return stored === null ? true : stored === 'true';
  });

  useEffect(() => {
    localStorage.setItem('isSidebarVisible', sidebarVisible.toString());
  }, [sidebarVisible]);

  const toggleSidebar = () => setSidebarVisible(prev => !prev);

  return (
    <DefineApp
      bodyStyle="bg-[#f8f9fa]"
      appIcon={appCalendarIcon}
      appTitle="Ace Schedules - Painel"
    >
      <PanelSidebar visible={sidebarVisible} setVisible={setSidebarVisible}>
        <main className={`w-full ${panelBodyStyles.panelBody}`}>
          <Navbar showSidebar={toggleSidebar} isSidebarVisible={sidebarVisible} />

          <div className={panelBodyStyles.enfeite1}>
            <img src={enfeite1} alt="" />
          </div>

          <div className={panelBodyStyles.cardContainer}>
            <div className={panelBodyStyles.row}>
              {children}
            </div>
          </div>

          <div className={panelBodyStyles.enfeite2}>
            <img src={enfeite2} alt="" />
          </div>

          <Footer />
        </main>
      </PanelSidebar>
    </DefineApp>
  );
};
