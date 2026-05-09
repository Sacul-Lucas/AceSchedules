import { Chart } from 'primereact/chart';
import { useEffect, useState } from "react";
import { PanelLayout } from '../../Core/Components/Layout/PanelLayout';
import appCalendarIcon from "../../assets/icons/calendar-alt-solid.svg";

export const Estatísticas = () => {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

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
        <PanelLayout layoutTitle='Ace Schedules - Estatísticas' layoutIcon={appCalendarIcon}>
            <div className="flex pt-[10dvh] col justify-center align-middle">
                <Chart type="pie" data={chartData} options={chartOptions} className="w-full md:w-30rem" />
            </div>
        </PanelLayout>

    )
}