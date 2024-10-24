import { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import { ptBR } from 'date-fns/locale';
import { startOfMonth, endOfMonth, isWithinInterval, addHours } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";

interface CardReservationModalProps {
    onClose: () => void;
}

export const CardReservationModal: React.FC<CardReservationModalProps> = ({
    onClose
}) => {
    const reservationRef = useRef<HTMLDialogElement>(null);
    const controlsContainerRef = useRef<HTMLDivElement>(null);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
    const [showStartPicker, setShowStartPicker] = useState<boolean>(true);

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

    const handleConfirm = () => {
        if (startDate && endDate) {
            alert(`Reserva feita de ${startDate.toLocaleString()} até ${endDate.toLocaleString()}`);
        } else {
            alert('Por favor, selecione um intervalo de datas e horários válidos.');
        }
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

    const clearStartDate = () => {
        setStartDate(null);
        setEndDate(null);
    };

    const clearEndDate = () => {
        setEndDate(null);
    };

    useEffect(() => {
        const updateControlsWidth = () => {
            const controlsContainer = controlsContainerRef.current;
            const calendarContainer = document.getElementsByClassName('react-datepicker') as HTMLCollectionOf<HTMLElement>;

            if (controlsContainer && calendarContainer.length > 0) {
                const calendarWidth = calendarContainer[0].offsetWidth;
                controlsContainer.style.width = `${calendarWidth}px`;
            }
        };

        updateControlsWidth();

        const observer = new MutationObserver(updateControlsWidth);
        const calendarContainer = document.getElementsByClassName('react-datepicker')[0];
        if (calendarContainer) {
            observer.observe(calendarContainer, { attributes: true, childList: true, subtree: true });
        }

        return () => {
            observer.disconnect();
        };
    }, [controlsContainerRef]);

    return (
        <dialog ref={reservationRef} id="modal">
            <div className="modal-container">
                <div className="flex flex-col items-center justify-center align-middle lg:!w-[30dvw] lg:!p-[2rem_3rem] modal">
                    <div className="mb-4">
                        <h1 className="lg:!text-[2rem]">Selecione uma data e horário</h1>
                    </div>
                    <div className="flex flex-col items-center w-full gap-4">
                        <div className="flex flex-row gap-4" ref={controlsContainerRef}>
                            <div className="relative w-full date-range-toggle">
                                <button className={`start-date !m-0 ${showStartPicker ? "active" : ""}`} onClick={() => setShowStartPicker(true)}>
                                    <div className="flex flex-col items-start">
                                        <span className="font-semibold label flex flex-row gap-[55%] w-full mb-1 items-center align-middle">
                                            Início
                                            <span className={`clear-date-btt ${startDate ? '!flex' : '!hidden'}`} onClick={clearStartDate}>X</span>
                                        </span>
                                        <span className="selected-date">{startDate ? startDate.toLocaleString() : 'Escolha'}</span>
                                    </div>
                                </button>
                                <button className={`end-date !m-0 ${!showStartPicker ? "active" : ""}`} onClick={() => setShowStartPicker(false)}>
                                    <div className="flex flex-col items-start">
                                        <span className={`font-semibold label flex flex-row gap-[63%] w-full mb-1 items-center align-middle`}>
                                            Fim
                                            <span className={`clear-date-btt ${endDate ? '!flex' : '!hidden'}`} onClick={clearEndDate}>X</span>
                                        </span>
                                        <span className="selected-date">{endDate ? endDate.toLocaleString() : 'Escolha'}</span>
                                    </div>
                                </button>
                            </div>
                        </div>
                        <div className="date-picker-wrapper">
                            {showStartPicker ? (
                                <DatePicker
                                    selected={startDate || undefined}
                                    onChange={handleStartDateChange}
                                    showTimeSelect
                                    timeFormat="p"
                                    timeIntervals={15}
                                    timeCaption="Horário"
                                    dateFormat="Pp"
                                    locale={ptBR}
                                    placeholderText="Data de início"
                                    className="p-2 border rounded"
                                    inline
                                    filterDate={isDateWithinMonth}
                                    onMonthChange={handleMonthChange}
                                />
                            ) : (
                                <DatePicker
                                    selected={endDate || undefined}
                                    onChange={handleEndDateChange}
                                    showTimeSelect
                                    timeFormat="p"
                                    timeIntervals={15}
                                    timeCaption="Horário"
                                    dateFormat="Pp"
                                    locale={ptBR}
                                    placeholderText="Data de fim"
                                    className="p-2 border rounded"
                                    inline
                                    filterDate={isDateWithinMonth}
                                    onMonthChange={handleMonthChange}
                                    minDate={startDate || undefined}
                                    minTime={startDate ? addHours(startDate, 1) : undefined}
                                    maxTime={startDate ? endOfMonth(startDate) : undefined}
                                />
                            )}
                        </div>
                    </div>
                    <div className='flex flex-row items-center justify-center w-full gap-8 mt-4 align-middle'>
                        <button id="close" className='lg:!text-[0.7rem]' onClick={onClose}>Cancelar</button>
                        <button id="reserva" className='lg:!text-[0.7rem]' onClick={handleConfirm}>Confirmar</button>
                    </div>
                </div>
            </div>
        </dialog>
    );
};