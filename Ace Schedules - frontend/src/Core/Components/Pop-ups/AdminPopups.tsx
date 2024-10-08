import { FormsUsuarios, Usuario } from "../Forms/FormsUsuarios";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FormsSalas, Sala} from '../Forms/FormsSala';
import { FormsReserva, Reserva } from '../Forms/FormsReserva';
import { Dispatch, SetStateAction, useState } from "react";
import { formatDateForMySQL, parseDateString } from "../Utils/functions/DateUtils";

interface AdminPopupsProps {
    idModal: string;
    salaAlocada?: string | null;
    setSalaAlocada?: Dispatch<SetStateAction<string>> | null;
    formLabel: string;
    show: boolean;
    handleClose: () => void;
    selectedUser?: Usuario | null;
    selectedReserva?: Reserva | null;
    selectedSala?: Sala | null;
    onSave: (formData: any) => void;
    idSalaAlocada?: number;
    setIdSalaAlocada?: Dispatch<SetStateAction<number>>;
}

export const AdminPopups: React.FC<AdminPopupsProps> = ({  
    idModal,
    salaAlocada, 
    setSalaAlocada = null,
    formLabel,
    show,
    handleClose,
    selectedUser,
    selectedReserva,
    selectedSala,
    idSalaAlocada,
    onSave,
}) => {
    const [statusChecked, setStatusChecked] = useState<string>('0'); // Inicializando o estado

    const handleStatusChange = (newStatus: string) => {
        setStatusChecked(newStatus);
    };

    const handleSave = () => {
        if (location.pathname === '/Reservas') {
            const dataAgendamentoInicial = (document.getElementById(idModal === 'Editmodal' ? 'EditData' : 'AddData') as HTMLInputElement)?.value
            const dataAgendamentoFinal = (document.getElementById(idModal === 'Editmodal' ? 'EditHora' : 'AddHora') as HTMLInputElement)?.value

            const formData = {
                id: selectedReserva?.id || null,
                salaAlocada: (document.getElementById(idModal === 'Editmodal' ? 'EditSalaAlocada' : 'AddSalaAlocada') as HTMLSelectElement)?.value || '',
                dataAgendamentoInicial: formatDateForMySQL(parseDateString(dataAgendamentoInicial)) || '',
                dataAgendamentoFinal: formatDateForMySQL(parseDateString(dataAgendamentoFinal)) || ''
            };
    
            onSave(formData); 
        } else if (location.pathname === '/Usuarios') {
            console.log(selectedUser?.id )
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
        } else if (location.pathname === '/Salas') {
            const formData = {
                id: selectedSala?.id || null,
                nome: (document.getElementById(idModal === 'Editmodal' ? 'EditSala' : 'AddSala') as HTMLInputElement)?.value || '',
                descricao: (document.getElementById(idModal === 'Editmodal' ? 'EditDescription' : 'AddDescription') as HTMLInputElement)?.value || '',
                caracteristicas: (document.getElementById(idModal === 'Editmodal' ? 'EditCaract' : 'AddCaract') as HTMLInputElement)?.value || '',
                status: statusChecked || null,
                backImg: (document.getElementById(idModal === 'Editmodal' ? 'EditIMG' : 'AddIMG') as HTMLInputElement)?.value || '',
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
                          idName={'EditSala'}
                          idDescription={'EditDescription'}
                          idIMG={'EditIMG'}
                          idCaract={'EditCaract'}
                          idStatus={'EditStatus'}
                          edit={true}
                          block={true} 
                          onStatusChange={handleStatusChange}
                          selectedSala={selectedSala!}
                       />
                    );
                } else if (idModal === "Viewmodal") {
                    return (
                       <FormsSalas
                           formVER={false}
                           formID={'View'}
                           idName={'ViewSala'}
                           idDescription={'ViewDescription'}
                           idIMG={'ViewIMG'}
                           idCaract={'ViewCaract'}
                           idStatus={'ViewStatus'}
                           edit={false}
                           block={false} 
                           selectedSala={selectedSala!}
                       />
                    );
                } else {
                    return (
                        <FormsSalas
                           formVER={true}
                           formID={'Add'}
                           idName={'AddSala'}
                           idDescription={'AddDescription'}
                           idIMG={'AddIMG'}
                           idCaract={'AddCaract'}
                           idStatus={'AddStatus'}
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
                            selectedReserva={selectedReserva!}
                            selectvalue={salaAlocada!}      
                            salaAction={setSalaAlocada} 
                            selectid={idSalaAlocada}            
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
                            selectedReserva={selectedReserva!} selectvalue={""}                        
                        />
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
                        selectvalue={""}                        
                    />
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
                            selectedUser={selectedUser!}
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
                            selectedUser={selectedUser!}
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