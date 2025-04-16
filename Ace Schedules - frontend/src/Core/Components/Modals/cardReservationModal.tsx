import { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import { ptBR } from 'date-fns/locale';
import { startOfMonth, endOfMonth, isWithinInterval, addHours, setHours, setMinutes } from 'date-fns';
import { CreateReservationAction } from "../../Actions/CreateReservationAction";
import { formatDateForMySQL } from "../Utils/functions/DateUtils";
import { Toast } from 'primereact/toast';
import "react-datepicker/dist/react-datepicker.css";

interface CardReservationModalProps {
    onClose: () => void;
    salaAlocada: number;
}

export const CardReservationModal: React.FC<CardReservationModalProps> = ({
    onClose,
    salaAlocada,
}) => {
    const reservationRef = useRef<HTMLDialogElement>(null);
    const controlsContainerRef = useRef<HTMLDivElement>(null);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
    const [showStartPicker, setShowStartPicker] = useState<boolean>(true);
    const toast = useRef<Toast>(null);

    const now = new Date();
    const isToday = startDate
      ? startDate.toDateString() === now.toDateString()
      : false;
    
    const minSelectableTime = isToday ? now : setHours(setMinutes(new Date(), 0), 0);
    const maxSelectableTime = setHours(setMinutes(new Date(), 45), 23);

    console.log(maxSelectableTime)

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

    const handleConfirm = async (e: { preventDefault: () => void; }) => {
 
        e.preventDefault();
        const dataAgendamentoInicial = formatDateForMySQL(startDate)
        const dataAgendamentoFinal = formatDateForMySQL(endDate)


        const reservationRes = await CreateReservationAction.execute({
            dataAgendamentoInicial,
            dataAgendamentoFinal,
            salaAlocada
        })

        const message = reservationRes.data

        switch (reservationRes.status) {
            case 'SUCCESS':
                toast.current?.show({
                    severity: 'success',
                    summary: 'Pronto!',
                    detail: message,
                    life: 3000,
                    closable: false
                });
              break;
      
            case 'RESERVATION_ALREADY_EXISTS':
                toast.current?.show({
                    severity: 'warn',
                    summary: 'Conflito de datas e/ou horários',
                    detail: message,
                    life: 3000,
                    closable: false
                });
              break;

            case 'INVALID_VALUES':
                toast.current?.show({
                  severity: 'warn',
                  summary: 'Dados incompletos',
                  detail: message,
                  life: 3000,
                  closable: false
                });
              break;
      
            case 'UNKNOWN':
                toast.current?.show({
                    severity: 'error',
                    summary: 'Erro',
                    detail: message,
                    life: 3000,
                    closable: false
                });
              break;
      
            default:
                toast.current?.show({
                  severity: 'error',
                  summary: 'Erro',
                  detail: message,
                  life: 3000,
                  closable: false
                });
              break;
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

    const formatMonthWithCapital = (month: string) => {
        return month.charAt(0).toUpperCase() + month.slice(1);
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
            <div className="card-modal-container">
                <div className="flex flex-col items-center justify-center align-middle lg:!w-[30dvw] lg:!p-[2rem_3rem] card-modal">
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
                                <button className={`end-date !m-0 ${!showStartPicker ? "active" : ""}`} onClick={() => setShowStartPicker(false)} disabled={!startDate}>
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
                                    minDate={new Date()}
                                    minTime={minSelectableTime}
                                    maxTime={maxSelectableTime}

                                    renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
                                        <div>
                                            <button type="button" onClick={decreaseMonth} className="react-datepicker__navigation react-datepicker__navigation--previous" aria-label="Previous Month"><span className="react-datepicker__navigation-icon react-datepicker__navigation-icon--previous">{"<"}</span></button>
                                            <h2 className="react-datepicker__current-month">{`${formatMonthWithCapital(date.toLocaleString('pt-BR', { month: 'long' }))} ${date.getFullYear()}`}</h2>
                                            <button type="button" onClick={increaseMonth} className="react-datepicker__navigation react-datepicker__navigation--next react-datepicker__navigation--next--with-time" aria-label="Next Month"><span className="react-datepicker__navigation-icon react-datepicker__navigation-icon--next">{">"}</span></button>
                                        </div>
                                    )}
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
                                    minTime={
                                        startDate && endDate && startDate.toDateString() === endDate.toDateString()
                                          ? addHours(startDate, 1)
                                          : setHours(setMinutes(new Date(), 0), 0)
                                    }
                                    maxTime={startDate ? endOfMonth(startDate) : undefined}

                                    renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
                                        <div>
                                            <button type="button" onClick={decreaseMonth} className="react-datepicker__navigation react-datepicker__navigation--previous" aria-label="Previous Month"><span className="react-datepicker__navigation-icon react-datepicker__navigation-icon--previous">{"<"}</span></button>
                                            <h2 className="react-datepicker__current-month">{`${formatMonthWithCapital(date.toLocaleString('pt-BR', { month: 'long' }))} ${date.getFullYear()}`}</h2>
                                            <button type="button" onClick={increaseMonth} className="react-datepicker__navigation react-datepicker__navigation--next react-datepicker__navigation--next--with-time" aria-label="Next Month"><span className="react-datepicker__navigation-icon react-datepicker__navigation-icon--next">{">"}</span></button>
                                        </div>
                                    )}
                                />
                            )}
                        </div>
                    </div>
                    <div className='flex flex-row items-center justify-center w-full gap-5 mt-4 align-middle'>
                        <button id="close" className='lg:!text-[0.7rem]' onClick={onClose}>Cancelar</button>
                        <button id="reserva" className='lg:!text-[0.7rem]' onClick={handleConfirm}>Confirmar</button>
                    </div>
                </div>
            </div>

            <Toast ref={toast} />
        </dialog>
    );
};