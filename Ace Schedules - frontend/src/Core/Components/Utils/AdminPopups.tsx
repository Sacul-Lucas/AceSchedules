import { FormsReserva } from "./FormsReserva";
import { FormsSalas } from "./FormsSala";
import { FormsUsuarios } from "./FormsUsuarios";
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

interface AdminPopupsProps {
    idModal: string;
    formLabel: string;
    show: boolean;
    handleClose: () => void;
    selectedUsuario: number;
}

export const AdminPopups: React.FC<AdminPopupsProps> = ({  
    idModal,
    formLabel,
    show,
    handleClose,
}) => {
    const location = useLocation();

    // Função para determinar qual formulário deve ser exibido com base na rota
    const renderForm = () => {
        switch (location.pathname) {
            case '/Salas':
                return (
                    <FormsSalas
                        formVER={true}
                        formID={'Add'}
                        idName={'AddSala'}
                        idIMG={'AddIMG'}
                        idCaract={'AddCaract'}
                        edit={false}
                        block={false}
                    />
                );
            case '/Reservas':
                return (
                    <FormsReserva
                        formVER={true}
                        formID={'Add'}
                        idSala={'AddSala'}
                        idData={'AddData'}
                        idHora={'AddHora'}
                        edit={false}
                    />
                );
            case '/Usuarios':
                return (
                    <FormsUsuarios
                        formVER={true}
                        formID={'Add'}
                        idName={'AddName'}
                        idEmail={'AddEmail'}
                        idSenha={'AddSenha'}
                        idTell={'AddTell'}
                        idCNPJ={'AddCNPJ'}
                        idUserType={'AddUserType'}
                        edit={false} selectedUsuario={null}                    />
                );
            default:
                return null; // Ou algum conteúdo padrão ou mensagem de erro
        }
    };

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{formLabel}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {renderForm()}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Fechar</Button>
                    <Button variant="primary">Salvar</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
                


                            


                         




        