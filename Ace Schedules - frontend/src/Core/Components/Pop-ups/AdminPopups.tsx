import { FormsUsuarios, Usuario } from "../Forms/FormsUsuarios";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FormsSalas, Sala} from '../Forms/FormsSala';
import { FormsReserva, Reserva } from '../Forms/FormsReserva';
import { Dispatch, SetStateAction } from "react";

interface AdminPopupsProps {
    idModal: string;
    formLabel: string;
    show: boolean;
    handleClose: () => void;
    selectedUser: Usuario | null;
    selectedReserva: Reserva | null;
    onSave: (formData: any) => void;
}

interface AdminPopupsProps {
    idModal: string;
    salaAlocada: string;
    setSalaAlocada: Dispatch<SetStateAction<string>>;
    formLabel: string;
    show: boolean;
    handleClose: () => void;
    selectedUser: Usuario | null;
    selectedReserva: Reserva | null;
    onSave: (formData: any) => void;
}

export const AdminPopups: React.FC<AdminPopupsProps> = ({  
    idModal,
    salaAlocada, 
    setSalaAlocada,
    formLabel,
    show,
    handleClose,
    selectedUser,
    selectedReserva,
    onSave,
}) => {

    const handleSave = () => {
        if (location.pathname === '/Reservas') {
            const formData = {
                id: selectedReserva?.id || null,
                salaAlocada: (document.getElementById(idModal === 'Editmodal' ? 'EditSalaAlocada' : 'AddSalaAlocada') as HTMLSelectElement)?.value || '',
                dataAgendamento: (document.getElementById(idModal === 'Editmodal' ? 'EditData' : 'AddData') as HTMLInputElement)?.value || '',
                horaAgendamento: (document.getElementById(idModal === 'Editmodal' ? 'EditHora' : 'AddHora') as HTMLInputElement)?.value || ''
            };
    
            console.log('Reserva selecionada:', selectedReserva);
            console.log('FormData para reservas:', formData); 
            onSave(formData); 
        } else if (location.pathname === '/Usuarios') {
            const formData = {
                id: selectedUser?.id || null,
                usuario: (document.getElementById(idModal === 'Editmodal' ? 'EditName' : 'AddName') as HTMLInputElement)?.value || '',
                email: (document.getElementById(idModal === 'Editmodal' ? 'EditEmail' : 'AddEmail') as HTMLInputElement)?.value || '',
                senha: (document.getElementById(idModal === 'Editmodal' ? 'EditSenha' : 'AddSenha') as HTMLInputElement)?.value || '',
                telefone: (document.getElementById(idModal === 'Editmodal' ? 'EditTel' : 'AddTel') as HTMLInputElement)?.value || '',
                cnpj: (document.getElementById(idModal === 'Editmodal' ? 'EditCNPJ' : 'AddCNPJ') as HTMLInputElement)?.value || '',
                usertype: (document.getElementById(idModal === 'Editmodal' ? 'EditUserType' : 'AddUserType') as HTMLSelectElement)?.value || ''
            };
    
            onSave(formData); 
        }
    };

    const renderForm = () => {
        switch (location.pathname) {
             case '/Salas':
                 if (idModal === "Editmodal") {
                     return (
                         <FormsSalas
                             formVER={true}
                             formID={'Edit'}
                             idName={'AddSala'}
                             idIMG={'AddIMG'}
                             idCaract={'AddCaract'}
                             edit={true}
                             block={false} 
                             selectedSala={null}
                         />
                     );
                 } else if (idModal === "Viewmodal") {
                     return (
                        <FormsSalas
                            formVER={false}
                            formID={'View'}
                            idName={'AddSala'}
                            idIMG={'AddIMG'}
                            idCaract={'AddCaract'}
                            edit={false}
                            block={false} 
                            selectedSala={null}
                        />
                     );
                 } else {
                 return (
                        <FormsSalas
                            formVER={true}
                            formID={'Add'}
                            idName={'AddSala'}
                            idIMG={'AddIMG'}
                            idCaract={'AddCaract'}
                            edit={false}
                            block={false} 
                            selectedSala={null}                     
                        />
                 );
             }
            case '/Reservas':
                if (idModal === "Editmodal") {
                    return (
                        <FormsReserva
                            formVER={true}
                            formID={'Edit'}
                            idSalaAlocada={'EditSalaAlocada'}
                            idData={'EditData'}
                            idHora={'EditHora'}
                            edit={false}
                            selectedReserva={selectedReserva}
                            selectvalue={salaAlocada}      
                            salaAction={setSalaAlocada}                  
                            />
                    );
                } else if (idModal === "Viewmodal") {
                    return (
                        <FormsReserva
                            formVER={false}
                            formID={'View'}
                            idSalaAlocada={'ViewSalaAlocada'}
                            idData={'ViewData'}
                            idHora={'ViewHora'}
                            edit={false}
                            selectedReserva={selectedReserva} selectvalue={""}                        />
                    );
                } else {
                return (
                    <FormsReserva
                        formVER={true}
                        formID={'Add'}
                        idSalaAlocada={'AddSalaAlocada'}
                        idData={'AddData'}
                        idHora={'AddHora'}
                        edit={false}
                        selectedReserva={null}
                        selectvalue={""}                        />
                );
            }
            case '/Usuarios':
                if (idModal === "Editmodal") {
                    return (
                        <FormsUsuarios
                            formVER={true}
                            formID={'Edit'}
                            idName={'EditName'}
                            idEmail={'EditEmail'}
                            idSenha={'EditSenha'}
                            idTell={'EditTel'}
                            idCNPJ={'EditCNPJ'}
                            idUserType={'EditUserType'}
                            edit={false}
                            selectedUser={selectedUser}
                        />
                    );
                } else if (idModal === "Viewmodal") {
                    return (
                        <FormsUsuarios
                            formVER={false}
                            formID={'View'}
                            idName={'ViewName'}
                            idEmail={'ViewEmail'}
                            idSenha={'ViewSenha'}
                            idTell={'ViewTel'}
                            idCNPJ={'ViewCNPJ'}
                            idUserType={'ViewUserType'}
                            edit={false}
                            selectedUser={selectedUser}
                        />
                    );
                } else {
                    return (
                        <FormsUsuarios
                            formVER={true}
                            formID={'Add'}
                            idName={'AddName'}
                            idEmail={'AddEmail'}
                            idSenha={'AddSenha'}
                            idTell={'AddTel'}
                            idCNPJ={'AddCNPJ'}
                            idUserType={'AddUserType'}
                            edit={false}
                            selectedUser={null}
                        />
                    );
                }
            default:
                return null;
        }
    };

    return (
        <div>
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
                    {idModal !== "Viewmodal" && (
                        <Button variant="primary" onClick={handleSave}>Salvar</Button>
                    )}
                </Modal.Footer>
            </Modal>
        </div>
    );
};