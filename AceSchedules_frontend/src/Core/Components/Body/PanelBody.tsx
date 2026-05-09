import { PanelSidebar } from "../Sidebar/PanelSidebar";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../Navbar/Navbar";

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
    <PanelSidebar canAnimate={animate} visible={sidebarVisible} setVisible={setSidebarVisible}>
      <div className="w-full">
        <Navbar canAnimate={animate} showSidebar={toggleSidebar} isSidebarVisible={sidebarVisible} />

        <Outlet />
      </div>
    </PanelSidebar>
  );
};
