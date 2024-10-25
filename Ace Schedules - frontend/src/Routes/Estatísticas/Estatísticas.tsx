import { Chart } from 'primereact/chart';
import { DefineApp } from "../../Core/Components/Utils/DefineApp";
import { Navbar } from "../../Core/Components/Navbar/Navbar";
import { Footer } from "../../Core/Components/Footer/Footer";
import { useEffect, useState } from "react";
import { PanelSidebar } from "../../Core/Components/Sidebars/PanelSidebar";

export const Estatísticas = () => {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    
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

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const data = {
            labels: ['A', 'B', 'C'],
            datasets: [
                {
                    data: [540, 325, 702],
                    backgroundColor: [
                        documentStyle.getPropertyValue('--blue-500'), 
                        documentStyle.getPropertyValue('--yellow-500'), 
                        documentStyle.getPropertyValue('--green-500')
                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--blue-400'), 
                        documentStyle.getPropertyValue('--yellow-400'), 
                        documentStyle.getPropertyValue('--green-400')
                    ]
                }
            ]
        }
        const options = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true
                    }
                }
            }
        };

        setChartData(data);
        setChartOptions(options);
    }, []);

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
                            <div className="flex mt-[10dvh] col">
                                <Chart type="pie" data={chartData} options={chartOptions} className="w-full md:w-30rem" />
                            </div>
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