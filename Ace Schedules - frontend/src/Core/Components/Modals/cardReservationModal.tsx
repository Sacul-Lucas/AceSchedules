import { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ptBR } from 'date-fns/locale';
import { startOfMonth, endOfMonth, isWithinInterval } from 'date-fns';

interface CardReservationModalProps {
    onClose: () => void;
}

export const CardReservationModal: React.FC<CardReservationModalProps> = ({
    onClose
}) => {
    const reservationRef = useRef<HTMLDialogElement>(null);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

    const isDateWithinMonth = (date: Date) => {
        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(currentMonth);
        return isWithinInterval(date, { start: monthStart, end: monthEnd });
    };

    const handleMonthChange = (date: Date) => {
        setCurrentMonth(date);
    };

    useEffect(() => {
        const reservationModal = reservationRef.current;
        if (reservationModal) {
            reservationModal.showModal();
        }

        return () => {
            if (reservationModal) {
                reservationModal.close();
            }
        };
    }, [onClose]);

    return (
        <dialog ref={reservationRef} id="modal">
            <div className="modal-container">
                <div className="flex flex-col items-center justify-center align-middle lg:!w-[46dvw] lg:!p-[2rem_3rem] modal">
                    <div className="mb-4">
                        <h1 className="lg:!text-[2rem]">Selecione uma data e horário</h1>
                    </div>
                    <div className="flex flex-col items-center w-full gap-4">
                        <div className="flex flex-row gap-4">
                            <div className="date-picker-wrapper">
                                <DatePicker
                                    selected={startDate || undefined}
                                    onChange={(date: Date | null) => setStartDate(date)}
                                    selectsStart
                                    startDate={startDate || undefined}
                                    endDate={endDate || undefined}
                                    showTimeSelect
                                    timeFormat="p"
                                    timeIntervals={15}
                                    timeCaption="Hora"
                                    dateFormat="Pp"
                                    locale={ptBR}
                                    placeholderText="Data de início"
                                    className="p-2 border rounded"
                                    inline
                                    filterDate={isDateWithinMonth}
                                    onMonthChange={handleMonthChange}
                                />
                            </div>
                            <div className="date-picker-wrapper">
                                <DatePicker
                                    selected={endDate || undefined}
                                    onChange={(date: Date | null) => setEndDate(date)}
                                    selectsEnd
                                    startDate={startDate || undefined}
                                    endDate={endDate || undefined}
                                    showTimeSelect
                                    timeFormat="p"
                                    timeIntervals={15}
                                    timeCaption="Hora"
                                    dateFormat="Pp"
                                    locale={ptBR}
                                    placeholderText="Data de fim"
                                    className="p-2 border rounded"
                                    inline
                                    filterDate={isDateWithinMonth}
                                    onMonthChange={handleMonthChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-row items-center justify-center w-full gap-8 mt-4 align-middle'>
                        <button id="close" className='lg:!text-[0.7rem]' onClick={onClose}>Cancelar</button>
                        <button id="reserva" className='lg:!text-[0.7rem]' onClick={() => alert(`Reserva feita para ${startDate?.toLocaleString()} até ${endDate?.toLocaleString()}`)}>Confirmar</button>
                    </div>
                </div>
            </div>
        </dialog>
    );
}