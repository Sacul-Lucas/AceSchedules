import { FormsReserva } from "./FormsReserva";
import { FormsSalas } from "./FormsSala";
import { FormsUsuarios } from "./FormsUsuarios";
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

interface AdminPopupsProps {
    idModal: string;
    formLabel: string;
    show: boolean;
    handleClose: () => void;
}

export const AdminPopups: React.FC<AdminPopupsProps> = ({  
    idModal,
    formLabel,
    show,
    handleClose,
}) => {

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
                    <FormsSalas
                        formVER={true}
                        formID={'Add'}
                        idName={'AddSala'}
                        idIMG={'AddIMG'}
                        idCaract={'AddCaract'}
                        edit={false}
                        block={false}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Fechar</Button>
                    <Button variant="primary">Salvar</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

    // <div className="modal fade" id={idModal} aria-labelledby="ModalLabel" aria-hidden="true">
    //     <div className="modal-dialog">
    //         <div className="modal-content">
    //             <div className="modal-header">
    //                 <h5 className="modal-title" id="ModalLabel">{formLabel}</h5>
    //                 <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    //             </div>
                
    //                     <FormsSalas
    //                     formVER = {true}
    //                     formID = {'Add'}
    //                     idName = {'AddSala'}
    //                     idIMG = {'AddIMG'}
    //                     idCaract = {'AddCaract'}
    //                     edit = {false}
    //                     block = {false}
    //                     />

    //                 {/* <FormsReserva
    //                     formVER = {true}
    //                     formID = {'Add'}
    //                     idSala = {'AddSala'}
    //                     idData = {'AddData'}
    //                     idHora = {'AddHora'}
    //                     edit = {false}
    //                     />

    //                     <FormsUsuarios
    //                     formVER = {true}
    //                     formID = {'Add'}
    //                     idName = {'AddName'}
    //                     idEmail = {'AddEmail'}
    //                     idSenha = {'AddSenha'}
    //                     idTell = {'AddTell'}
    //                     idCNPJ = {'AddCNPJ'}
    //                     idUserType = {'AddUserType'}
    //                     edit = {false}
    //                     /> */}

    //         </div>
    //     </div>
    // </div>


        