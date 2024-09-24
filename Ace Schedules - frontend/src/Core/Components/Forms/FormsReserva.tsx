import React, { FormEventHandler, useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import { ptBR } from 'date-fns/locale';
import { startOfMonth, endOfMonth, isWithinInterval, addHours } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";
import { parseStringToDate } from '../Utils/DateUtils';

interface Sala {
  id: string;
  nome: string;
}

export interface Reserva {
  id: number; 
  data: string;
  hora: string;
  idSalaAlocada: number
  salaAlocada: string;
  locador: string;
  emailLocador: string;
  contatoLocador: string;
  cnpjLocador: string;
  status: boolean;
}

interface FormsReservaProps {
  selectid?: number | undefined;
  selectvalue: string;
  selectedReserva: Reserva | null;
  formVER: boolean;
  formID: string;
  idSalaAlocada: string;
  idData: string;
  idHora: string;
  edit: boolean;
  salaAction?: FormEventHandler<HTMLLabelElement> | undefined | any;
}

export const FormsReserva: React.FC<FormsReservaProps> = ({
  selectvalue,
  selectedReserva,
  formVER,
  formID,
  idSalaAlocada,
  idData,
  idHora,
  salaAction,
  selectid
}) => {
  const [startDate, setStartDate] = useState<Date | null>(parseStringToDate(selectedReserva?.data));
  const [endDate, setEndDate] = useState<Date | null>(parseStringToDate(selectedReserva?.hora));
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

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
    }
  };

  const handleEndDateChange = (date: Date | null) => {
    if (date) {
      setEndDate(date);
    }
  };

  const [salas, setSalas] = useState<Sala[]>([]);

  useEffect(() => {
    const fetchSalas = async () => {
      try {
        const response = await fetch('/api/adminPaths/Salas');
        const data = await response.json();

        if (data && Array.isArray(data.salas)) {
          setSalas(data.salas);
        } else {
          console.error('Erro: Salas não são um array', data);
        }
      } catch (error) {
        console.error('Erro ao buscar as salas:', error);
      }
    };

    fetchSalas();
  }, []);

  return (
    <div>
      {formVER === false ? (
        <div>
          <div className="modal-body">
            <div className="mb-3">
              <label>Nome da sala alocada</label>
              <p id="view_nome" className="form-control">{selectedReserva?.salaAlocada}</p>
            </div>
            <div className="mb-3">
            <label>Data e hora de início da reserva</label>
            <p id="view_data" className="form-control">
                {selectedReserva ? selectedReserva.data : ''}
            </p>
            </div>
            <div className="mb-3">
              <label>Data e hora do final da reserva</label>
              <p id="view_hora" className="form-control">{selectedReserva?.hora}</p>
            </div>
            <div className="mb-3">
              <label>Locador da sala</label>
              <p id="view_locador" className="form-control">{selectedReserva?.locador}</p>
            </div>
            <div className="mb-3">
              <label>Email do locador</label>
              <p id="view_email" className="form-control">{selectedReserva?.emailLocador}</p>
            </div>
            <div className="mb-3">
              <label>Contato do locador</label>
              <p id="view_contato" className="form-control">{selectedReserva?.contatoLocador}</p>
            </div>
            <div className="mb-3">
              <label>CNPJ do locador</label>
              <p id="view_cnpj" className="form-control">{selectedReserva?.cnpjLocador}</p>
            </div>
          </div>
        </div>
      ) : (
        <form id={formID} method="POST">
          <div className="modal-body">
            <div className="mb-3">
            <label htmlFor={idSalaAlocada}>Sala Alocada</label>
            <select className="form-control" id={idSalaAlocada} onChange={salaAction} defaultValue={selectvalue}>
              {selectvalue && typeof selectvalue === 'string' ? (
                <option value={selectid}>{selectvalue}</option>
              ) : (
                <option value="" disabled>Selecione uma sala</option>
              )}
              {salas.map((sala) => (
                <option key={`${sala.id}-${sala.nome}`} value={sala.id}>
                  {sala.nome}
                </option>
              ))}
            </select>
            
            </div>
            <div className="flex flex-col mb-3">
              <label>Data e hora de início da reserva</label>
              <DatePicker
                id={idData}
                selected={startDate}
                onChange={handleStartDateChange}
                showTimeSelect
                timeFormat="p"
                timeIntervals={15}
                timeCaption="Horário"
                dateFormat="Pp"
                locale={ptBR}
                placeholderText="Data de início"
                className="p-2 border rounded form-control"
                filterDate={isDateWithinMonth}
                onMonthChange={handleMonthChange}
              />
            </div>
            <div className="flex flex-col mb-3">
              <label>Data e hora do final da reserva</label>
              <DatePicker
                id={idHora}
                selected={endDate}
                onChange={handleEndDateChange}
                showTimeSelect
                timeFormat="p"
                timeIntervals={15}
                timeCaption="Horário"
                dateFormat="Pp"
                locale={ptBR}
                placeholderText="Data de fim"
                className="p-2 border rounded form-control"
                filterDate={isDateWithinMonth}
                onMonthChange={handleMonthChange}
                minDate={startDate || undefined}
                minTime={startDate ? addHours(startDate, 1) : undefined}
                maxTime={startDate ? endOfMonth(startDate) : undefined}
              />
            </div>
          </div>
        </form>
      )}
    </div>
  );
};