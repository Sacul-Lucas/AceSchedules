import { ReactNode, useState } from "react";
import { Navbar } from "../Navbar/Navbar";
import { Footer } from "../Footer/Footer";
import { PanelSidebar } from "../Sidebar/PanelSidebar";
import { DefineApp } from "../Utils/DefineApp";

interface PanelBodyProps {
    children: ReactNode;
}

export const PanelBody: React.FC<PanelBodyProps> = ({
    children,
}) => {
    const sidebarVisibleState = localStorage.getItem('isSidebarLocked')
    const sidebarLockedState = localStorage.getItem('isSidebarLocked')
    const [sidebarVisible, setSidebarVisible] = useState(
        sidebarVisibleState ? 
        sidebarVisibleState && sidebarLockedState === 'true' ? true : false 
        : true
    );

    const toggleSidebar = () => {
        setSidebarVisible(prev => {
            const newValue = !prev;
            localStorage.setItem('isSidebarVisible', newValue.toString());
            return newValue;
        });
    };

    return (
        <DefineApp cssPath="src/Core/Css/Owned/Painel.css" appIcon="src/assets/icons/calendar-alt-solid.svg" appTitle="Ace Schedules - Painel">
            <PanelSidebar visible={sidebarVisible} setVisible={setSidebarVisible}>
                <main className="w-full panelBody">
                    <Navbar showSidebar={toggleSidebar} isSidebarVisible={sidebarVisible}/>
                    
                    <div className="enfeite1">
                        <img src="src/assets/img/enfeite1.png" alt=""/>
                    </div>
                    
                    <div className="card-container">
                        <div className="row">
                            {children}
                        </div>
                    </div>

                    <div className="enfeite2">
                        <img src="src/assets/img/enfeite2.png" alt=""/>
                    </div>
                                
                    <Footer/>
                </main>
            </PanelSidebar>
        </DefineApp>
    )
}