import { PanelSidebar } from "../Sidebar/PanelSidebar";
import { DefineApp } from "../Utils/DefineApp";
import { useEffect, useState } from "react";
import { Navbar } from "../Navbar/Navbar";
import { Footer } from "../Footer/Footer";
import { Outlet } from "react-router-dom";

import appCalendarIcon from "../../../assets/icons/calendar-alt-solid.svg";
import panelBodyStyles from '../../Css/Owned/Painel.module.css';
import enfeite1 from '../../../assets/img/enfeite1.png';
import enfeite2 from '../../../assets/img/enfeite2.png';

// interface PanelBodyProps {
//   children: ReactNode;
// }

export const PanelBody = () => {
  const [sidebarVisible, setSidebarVisible] = useState<boolean>(() => {
    const stored = localStorage.getItem('isSidebarVisible');
    return stored === null ? true : stored === 'true';
  });

  useEffect(() => {
    localStorage.setItem('isSidebarVisible', sidebarVisible.toString());
  }, [sidebarVisible]);

  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem('visited');
    if (!hasVisited) {
      setAnimate(true);
      sessionStorage.setItem('visited', 'true');
    }
  }, []);

  const toggleSidebar = () => setSidebarVisible(prev => !prev);

  return (
    <DefineApp
      bodyStyle={`bg-[#f8f9fa] ${animate ? "transition-opacity duration-500 opacity-100" : ""}`}
      appIcon={appCalendarIcon}
      appTitle="Ace Schedules - Painel"
    >
      <PanelSidebar canAnimate={animate} visible={sidebarVisible} setVisible={setSidebarVisible}>
        <main className={`w-full ${panelBodyStyles.panelBody}`}>
          <Navbar canAnimate={animate} showSidebar={toggleSidebar} isSidebarVisible={sidebarVisible} />

          <div className={`${panelBodyStyles.enfeite1} ${animate ? "animate-[500ms_lineDown_ease-in]" : ""}`}>
            <img src={enfeite1} alt="" />
          </div>

          <div className={panelBodyStyles.cardContainer}>
            <div className={`${panelBodyStyles.row} ${animate ? "animate-[2s_showUp_ease-in]" : ""}`}>
              <Outlet />
            </div>
          </div>

          <div className={`${panelBodyStyles.enfeite2} ${animate ? "animate-[500ms_lineUp_ease-out]" : ""}`}>
            <img src={enfeite2} alt="" />
          </div>

          <Footer canAnimate={animate} />
        </main>
      </PanelSidebar>
    </DefineApp>
  );
};
