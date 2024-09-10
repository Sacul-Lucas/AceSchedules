import React, { useEffect, useRef, useState } from 'react';
import { CardReservationModal } from './cardReservationModal.tsx';

interface CardModalProps {
    cardCaracterísticas?: any[];
    cardTitle?: string;
    onClose: () => void;
}

export const CardModal: React.FC<CardModalProps> = ({
    cardCaracterísticas,
    cardTitle,
    onClose
}) => {
    const modalRef = useRef<HTMLDialogElement>(null);
    const equipamentsRef = useRef<HTMLUListElement>(null);
    const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);

    
    const openReservationModal = () => {
        setIsReservationModalOpen(true);
    };

    const closeReservationModal = () => {
        setIsReservationModalOpen(false);
    };
    
    useEffect(() => {
        const equipamentsList = equipamentsRef.current;
        if (equipamentsList) {
            equipamentsList.innerHTML = '';
            if (cardCaracterísticas) {
                cardCaracterísticas.forEach((item) => {
                    let li = document.createElement("li");
                    li.innerText = item;
                    equipamentsList.appendChild(li);
                });
            }
        }

        
        const modal = modalRef.current;
        if (modal) {
            modal.showModal();
        }

        return () => {
            if (modal) {
                modal.close();
            }
        };
    }, [onClose, cardCaracterísticas]);

    return (
        <div>
            <dialog ref={modalRef} id="modal">
                <div className="modal-container">
                    <div className="flex flex-col items-center justify-center align-middle lg:!w-[25dvw] lg:!p-[2rem_3rem] modal">
                        <h1 className='lg:!text-[2rem]'>Informações {cardTitle}</h1>
                        <p className='lg:!text-[0.7rem]'>
                            {cardCaracterísticas?.length !== undefined || 0 ? 
                                'Equipamentos e ferramentas disponíveis no momento:' 
                                : 
                                'Sem equipamentos ou ferramentas disponíveis no momento :('
                            }
                        </p>
                        <ul ref={equipamentsRef} className='lg:!text-[0.7rem] equipList'></ul>
                        <div className='flex flex-row items-center justify-center w-full gap-8 align-middle'>
                            <button id="close" className='lg:!text-[0.7rem]' onClick={onClose}>Fechar</button>
                            <button id="reserva" className='lg:!text-[0.7rem]' onClick={openReservationModal}>Prosseguir</button>
                        </div>
                    </div>
                </div>
            </dialog>

            {isReservationModalOpen && (
                <CardReservationModal 
                    onClose={closeReservationModal}
                />
            )}
        </div>
    )
}