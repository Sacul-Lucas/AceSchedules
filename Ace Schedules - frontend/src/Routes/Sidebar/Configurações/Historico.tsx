import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { startOfMonth, endOfMonth, isWithinInterval, addHours } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { DefineApp } from "../../../Core/Components/Utils/DefineApp";
import { Navbar } from "../../../Core/Components/Navbar/Navbar";
import { PanelSidebar } from "../../../Core/Components/Sidebars/PanelSidebar";

 export const Historico = () => {
    
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [show, setShow] = useState(false);
    const [viewMode, setViewMode] = useState(false);

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
    const [selectedReserva, setselectedReserva] = useState<any>(null);
    const [salaAlocada, setSalaAlocada] = useState('');
    const [idSalaAlocada, setIdSalaAlocada] = useState(0);
    

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


    const handleClose = () => setShow(false);

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
        const formatDate = (date: Date | null | undefined): string => {
        return date ? date.toISOString().split('T')[0] : ''; // Format to YYYY-MM-DD
        };

        const response = await fetch(
        `/api/adminPaths/Reservas/?status=0&sala=${encodeURIComponent(
            filterSalaAlocada
        )}&data=${encodeURIComponent(formatDate(FilterDataInicio))}&hora=${encodeURIComponent(
            formatDate(FilterDataFim)
        )}`
        );

        if (response.ok) {
        const data = await response.json();
        setReservasPendentes(data.reservas || []);
        setTotalreservasPendentes(data.total || 0);
        } else {
        console.error("Erro ao carregar reservas pendentes:", response.statusText);
        }
    } catch (error) {
        console.error("Erro ao carregar reservas pendentes:", error);
    }
    };

    const loadReservasAprovadas = async () => {
    try {
        const formatDate = (date: Date | null | undefined): string => {
        return date ? date.toISOString().split('T')[0] : ''; // Format to YYYY-MM-DD
        };

        const response = await fetch(
        `/api/adminPaths/Reservas/?status=1&sala=${encodeURIComponent(
            filterSalaAlocadaAprovada
        )}&data=${encodeURIComponent(formatDate(FilterDataInicioAprovada))}&hora=${encodeURIComponent(
            formatDate(FilterDataFimAprovada)
        )}`
        );

        if (response.ok) {
        const data = await response.json();
        setReservasAprovadas(data.reservas || []);
        setTotalreservasAprovadas(data.total || 0);
        } else {
        console.error("Erro ao carregar reservas aprovadas:", response.statusText);
        }
    } catch (error) {
        console.error("Erro ao carregar reservas aprovadas:", error);
    }
    };

    const handleView = async (id: number) => {
        try {
            const response = await fetch(`/api/adminPaths/Reservas/Visualizar/${id}`, {
              method: 'GET',
              headers: {
                  'Cache-Control': 'no-cache'
              }
            });
            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    const adjustedData = {
                      id: data.data.id, 
                      data: data.data.data,
                      hora: data.data.hora,
                      idSalaAlocada: data.data.salaId,
                      salaAlocada: data.data.salaAlocada,
                      locador: data.data.locador,
                      emailLocador: data.data.emailLocador,
                      contatoLocador: data.data.contatoLocador,
                      cnpjLocador: data.data.cnpjLocador,
                      status: data.data.status
                    };
                    setselectedReserva(adjustedData);
                    setViewMode(true);
                } else {
                    alert(data.message);
                }
            } else {
                console.error('Erro ao carregar dados da reserva:', response.statusText);
            }
        } catch (error) {
            console.error("Erro ao buscar a reserva:", error);
        }
    };

    const renderTableRows = (reservas: any[], tableType: 'pendentes' | 'aprovados') => {
        if (reservas.length === 0) {
            return (
                <tr>
                  <td colSpan={6}>Nenhuma reserva encontrada.</td>
                </tr>
            );
        }
        return reservas.map((reserva, index) => (
            <tr key={index}>
                <td>{reserva.id}</td>
                <td>{reserva.dataAgendamentoInicial}</td>
                <td>{reserva.dataAgendamentoFinal}</td>
                <td>{reserva.sala_nome}</td>
                <td className="!flex !justify-end">
                    <button type='button' data-id={reserva.id} className='mx-1 viewBtn btn btn-info btn-sm' onClick={() => handleView(reserva.id)}>Visualizar</button>
                </td>
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
    <Navbar showSidebar={toggleSidebar}/>

    <div className="relative flex flex-col flex-auto">
        <div className="container mt-4 xl:!max-w-[90%]">
            <div className="row">
            <div className="col-md-12">
                <div className="card">
                <div className="card-header">
                    <h4>Agendamentos pendentes (<span id="detalhes-usuario">{totalreservasPendentes}</span>)
                    </h4>
                    <div className="flex items-stretch pt-3 w-100">
                    <div className="form-group">
                        <label className="pr-1 text-black" htmlFor="sala_aprov">Sala alocada:</label>
                        <select className="!text-black !border !border-black !h-7 p-[0.1rem]" id="filter_sala" name="filter_sala" onChange={(e) => setFilterSalaAlocada(e.target.value)} value={filterSalaAlocada} required>
                        <option value="">--Todas as salas--</option>
                        {salas.map(sala => (
                            <option key={sala.id} value={sala.id}>{sala.nome}</option>
                        ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="pl-2 pr-1 text-black" >Data e hora:</label>
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
                    <label className="pl-2 pr-1 text-black" >Data e hora:</label>
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
                    </div>
                </div>
                <div className="card-body">
                    <table className="table table-bordered table-striped" id="reservas">
                    <thead>
                        <tr>
                        <th>ID</th>
                        <th>Data e hora de início da reserva</th>
                        <th>Data e hora do final da reserva</th>
                        <th>Sala alocada</th>
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
        <div className="container mt-4 xl:!max-w-[90%]">
            <div className="row">
            <div className="col-md-12">
                <div className="card">
                <div className="card-header">
                <h4>Agendamentos aprovados
                (<span id="detalhes-usuario">{totalreservasAprovadas}</span>)
                </h4>
                    <div className="flex items-stretch pt-3 w-100">
                    <div className="form-group">
                    <label className="pr-1 text-black" htmlFor="sala_aprov">Sala alocada:</label>
                        <select className="!text-black !border !border-black !h-7 p-[0.1rem]" id="sala_aprov" name="sala_aprov" onChange={(e) => setFilterSalaAlocadaAprovada(e.target.value)} value={filterSalaAlocadaAprovada} required>
                        <option value="">--Todas as salas--</option>
                        {salas.map(sala => (
                            <option key={sala.id} value={sala.id}>{sala.nome}</option>
                        ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="pl-2 pr-1 text-black" >Data e hora:</label>
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
                    <label className="pl-2 pr-1 text-black" >Data e hora:</label>
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
                    </div>
                </div>
                <div className="card-body">
                    <table className="table table-bordered table-striped" id="reservas_aprov">
                    <thead>
                        <tr>
                        <th>ID</th>
                        <th>Data e hora de início da reserva</th>
                        <th>Data e hora do final da reserva</th>
                        <th>Sala alocada</th>
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
    </DefineApp>
    <PanelSidebar visible={sidebarVisible} setVisible={setSidebarVisible} />
</div>
   );
 };