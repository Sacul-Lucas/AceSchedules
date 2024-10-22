import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { startOfMonth, endOfMonth, isWithinInterval, addHours, formatDate } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { DefineApp } from "../../../Core/Components/Utils/DefineApp";
import { Navbar } from "../../../Core/Components/Navbar/Navbar";
import { Historyinput, LoadHistoryAction } from "../../../Core/Actions/CarregarHistorico";
import { PanelSidebar } from "../../../Core/Components/Sidebars/PanelSidebar";

 export const Historico = () => {
    
    const [sidebarVisible, setSidebarVisible] = useState(false);

    const [reservasPendentes, setReservasPendentes] = useState<any[]>([]);
    const [reservasAprovadas, setReservasAprovadas] = useState<any[]>([]);
    const [salas, setSalas] = useState<any[]>([]);
    const [filterSalaAlocada, setFilterSalaAlocada] = useState<string>("");
    const [FilterDataInicio, setFilterDataInicio] = useState<Date | null>();
    const [FilterDataFim, setFilterDataFim] = useState<Date | null>();
    const [filterSalaAlocadaAprovada, setFilterSalaAlocadaAprovada] = useState<string>("");
    const [FilterDataInicioAprovada, setFilterDataInicioAprovada] = useState<Date | null>();
    const [FilterDataFimAprovada, setFilterDataFimAprovada] = useState<Date | null>();
    const [totalreservasPendentes, setTotalreservasPendentes] = useState(0);
    const [totalreservasAprovadas, setTotalreservasAprovadas] = useState(0);
    

    const [startDate, setStartDate] = useState<Date | null>();
    const [endDate, setEndDate] = useState<Date | null>();
    const [startDateAprov, setStartDateAprov] = useState<Date | null>();
    const [endDateAprov, setEndDateAprov] = useState<Date | null>();
    const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

    const toggleSidebar = () => {
        setSidebarVisible(prev => !prev);
    };

    const isDateWithinMonth = (date: Date) => {
        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(currentMonth);
        return isWithinInterval(date, { start: monthStart, end: monthEnd });
    };

    const handleMonthChange = (date: Date) => {
        setCurrentMonth(date);
    };

    const handleStartDateChange = (date: Date | null) => {
        if (date) {
            setStartDate(date);
            setEndDate(null);
            setFilterDataInicio(date)
        }
    };

    const handleEndDateChange = (date: Date | null) => {
        if (date) {
            setEndDate(date);
            setFilterDataFim(date)
        }
    };
    
    const handleStartDateChangeAprov = (date: Date | null) => {
        if (date) {
            setStartDateAprov(date);
            setEndDateAprov(null);
            setFilterDataInicioAprovada(date)
        }
    };

    const handleEndDateChangeAprov = (date: Date | null) => {
        if (date) {
            setEndDateAprov(date);
            setFilterDataFimAprovada(date)
        }
    };

    const loadSalas = async () => {
        try {
        const response = await fetch('/api/adminPaths/Salas');
        if (response.ok) {
            const data = await response.json();
            setSalas(data.salas || []);
        } else {
            console.error("Erro ao carregar salas:", response.statusText);
        }
        } catch (error) {
        console.error("Erro ao carregar salas:", error);
        }
    };

    const loadReservasPendentes = async () => {
        try {
            const input: Historyinput = {
                filterSalaAlocada: filterSalaAlocada,
                FilterDataInicio: formatDate(FilterDataInicio),
                FilterDataFim: formatDate(FilterDataFim),
                status: false
            };

            // Log dos dados de input antes de enviar a requisição
            console.log("Input para reservas pendentes:", input);

            const result = await LoadHistoryAction.execute(input);

            // Log da resposta do backend
            console.log("Resultado da API de reservas pendentes:", result);

            if (result.status === 'SUCCESS') {
                setReservasPendentes(result.data.reservas || []);
                setTotalreservasPendentes(result.data.total || 0);
            } else {
                console.error("Erro ao carregar reservas pendentes:", result.data);
            }
        } catch (error) {
            console.error("Erro ao carregar reservas pendentes:", error);
        }
    };

    const loadReservasAprovadas = async () => {
        try {
            const input: Historyinput = {
                filterSalaAlocada: filterSalaAlocadaAprovada,
                FilterDataInicio: formatDate(FilterDataInicioAprovada),
                FilterDataFim: formatDate(FilterDataFimAprovada),
                status: true
            };

            // Log dos dados de input antes de enviar a requisição
            console.log("Input para reservas aprovadas:", input);

            const result = await LoadHistoryAction.execute(input);

            // Log da resposta do backend
            console.log("Resultado da API de reservas aprovadas:", result);

            if (result.status === 'SUCCESS') {
                setReservasAprovadas(result.data.reservas || []);
                setTotalreservasAprovadas(result.data.total || 0);
            } else {
                console.error("Erro ao carregar reservas aprovadas:", result.data);
            }
        } catch (error) {
            console.error("Erro ao carregar reservas aprovadas:", error);
        }
    };

    const formatDate = (date: Date | null | undefined): string => {
        return date ? date.toISOString().split('T')[0] : ''; // Formatar para YYYY-MM-DD
    };

    const renderTableRows = (reservas: any[], tableType: 'pendentes' | 'aprovados') => {
        if (reservas.length === 0) {
            return (
                <tr>
                    <td colSpan={4} className="border border-gray-300 p-2 text-center">Nenhuma reserva encontrada.</td>
                </tr>
            );
        }
        return reservas.map((reserva, index) => (
            <tr key={index} className="odd:bg-gray-100">
                <td className="border border-gray-300 p-2 !justify-center text-center id-col">{reserva.id}</td>
                <td className="border border-gray-300 p-2 !justify-center">{reserva.dataAgendamentoInicial}</td>
                <td className="border border-gray-300 p-2 !justify-center">{reserva.dataAgendamentoFinal}</td>
                <td className="border border-gray-300 p-2 !justify-center">{reserva.sala_nome}</td>
            </tr>
        ));
    };
    
      useEffect(() => {
        loadReservasPendentes();
        loadReservasAprovadas();
        loadSalas();  
      }, [filterSalaAlocada, FilterDataInicio, FilterDataFim , filterSalaAlocadaAprovada, FilterDataInicioAprovada, FilterDataFimAprovada ]);

return (
<div>
    <DefineApp cssPath="src/Core/Css/Owned/Painel.css" appIcon="src/assets/icons/calendar-alt-solid.svg" appTitle="Ace Schedules - Painel">
        <Navbar showSidebar={toggleSidebar} />

        <div className="relative flex flex-col flex-auto place-items-center">
            <div className="container mt-4 xl:!max-w-[60%]">
                <div className="row">
                    <div className="col-md-12">
                        <div className="relative flex flex-col min-w-0 bg-white border border-gray-300 rounded-md">
                            <div className="px-4 py-3 mb-0 bg-gray-100 border-b border-gray-300">
                                <h4 className="text-2xl">Agendamentos pendentes (<span id="detalhes-usuario">{totalreservasPendentes}</span>)</h4>
                                <div className="flex items-stretch pt-3 w-100">
                                    <div className="form-group">
                                        <label className="pl-2 pr-1 text-black">Data e hora:</label>
                                        <DatePicker
                                            id={"filter_data_inicio"}
                                            selected={startDate}
                                            onChange={handleStartDateChange}
                                            showTimeSelect
                                            timeFormat="p"
                                            timeIntervals={15}
                                            timeCaption="Horário"
                                            dateFormat="Pp"
                                            locale={ptBR}
                                            placeholderText="Data de início"
                                            className="!text-black !border !border-black !h-7 p-2"
                                            filterDate={isDateWithinMonth}
                                            onMonthChange={handleMonthChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="pl-2 pr-1 text-black">Data e hora:</label>
                                        <DatePicker
                                            id={"filter_data_fim"}
                                            selected={endDate}
                                            onChange={handleEndDateChange}
                                            showTimeSelect
                                            timeFormat="p"
                                            timeIntervals={15}
                                            timeCaption="Horário"
                                            dateFormat="Pp"
                                            locale={ptBR}
                                            placeholderText="Data de fim"
                                            className="!text-black !border !border-black !h-7 p-2"
                                            filterDate={isDateWithinMonth}
                                            onMonthChange={handleMonthChange}
                                            minDate={startDate || undefined}
                                            minTime={startDate ? addHours(startDate, 1) : undefined}
                                            maxTime={startDate ? endOfMonth(startDate) : undefined}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="pr-1 pl-2 text-black" htmlFor="sala_aprov">Sala alocada:</label>
                                        <select className="!text-black !border !border-black !h-7 p-[0.1rem]" id="filter_sala" name="filter_sala" onChange={(e) => setFilterSalaAlocada(e.target.value)} value={filterSalaAlocada} required>
                                            <option value="">--Todas as salas--</option>
                                            {salas.map(sala => (
                                                <option key={sala.id} value={sala.id}>{sala.nome}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-1 min-h-[1px] p-5">
                                <table className="table-auto border border-collapse border-gray-300 w-full" id="reservas">
                                    <thead>
                                        <tr className="border border-gray-300">
                                            <th className="border border-gray-300 p-2">ID</th>
                                            <th className="border border-gray-300 p-2">Data e hora de início da reserva</th>
                                            <th className="border border-gray-300 p-2">Data e hora do final da reserva</th>
                                            <th className="border border-gray-300 p-2">Sala alocada</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {renderTableRows(reservasPendentes, 'pendentes')}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mt-4 xl:!max-w-[60%]">
                <div className="row">
                    <div className="col-md-12">
                        <div className="relative flex flex-col min-w-0 bg-white border border-gray-300 rounded-md">
                            <div className="px-4 py-3 mb-0 bg-gray-100 border-b border-gray-300">
                                <h4 className="text-2xl">Agendamentos aprovados (<span id="detalhes-usuario">{totalreservasAprovadas}</span>)</h4>
                                <div className="flex items-stretch pt-3 w-100">
                                    <div className="form-group">
                                        <label className="pr-1 text-black">Data e hora:</label>
                                        <DatePicker
                                            id={"filter_data_inicio_aprov"}
                                            selected={startDateAprov}
                                            onChange={handleStartDateChangeAprov}
                                            showTimeSelect
                                            timeFormat="p"
                                            timeIntervals={15}
                                            timeCaption="Horário"
                                            dateFormat="Pp"
                                            locale={ptBR}
                                            placeholderText="Data de início"
                                            className="!text-black !border !border-black !h-7 p-2"
                                            filterDate={isDateWithinMonth}
                                            onMonthChange={handleMonthChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="pl-2 pr-1 text-black">Data e hora:</label>
                                        <DatePicker
                                            id={"filter_data_fim_aprov"}
                                            selected={endDateAprov}
                                            onChange={handleEndDateChangeAprov}
                                            showTimeSelect
                                            timeFormat="p"
                                            timeIntervals={15}
                                            timeCaption="Horário"
                                            dateFormat="Pp"
                                            locale={ptBR}
                                            placeholderText="Data de fim"
                                            className="!text-black !border !border-black !h-7 p-2"
                                            filterDate={isDateWithinMonth}
                                            onMonthChange={handleMonthChange}
                                            minDate={startDate || undefined}
                                            minTime={startDate ? addHours(startDate, 1) : undefined}
                                            maxTime={startDate ? endOfMonth(startDate) : undefined}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="pr-1 pl-2 text-black" htmlFor="sala_aprov">Sala alocada:</label>
                                        <select className="!text-black !border !border-black !h-7 p-[0.1rem]" id="sala_aprov" name="sala_aprov" onChange={(e) => setFilterSalaAlocadaAprovada(e.target.value)} value={filterSalaAlocadaAprovada} required>
                                            <option value="">--Todas as salas--</option>
                                            {salas.map(sala => (
                                                <option key={sala.id} value={sala.id}>{sala.nome}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-1 min-h-[1px] p-5">
                                <table className="table-auto border border-collapse border-gray-300 w-full" id="reservas_aprov">
                                    <thead>
                                        <tr className="border border-gray-300">
                                            <th className="border border-gray-300 p-2">ID</th>
                                            <th className="border border-gray-300 p-2">Data e hora de início da reserva</th>
                                            <th className="border border-gray-300 p-2">Data e hora do final da reserva</th>
                                            <th className="border border-gray-300 p-2">Sala alocada</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {renderTableRows(reservasAprovadas, 'aprovados')}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <PanelSidebar visible={sidebarVisible} setVisible={setSidebarVisible} />
    </DefineApp>
</div>
)
}