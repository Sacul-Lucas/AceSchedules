import { FormsUsuarios, Usuario } from "../Forms/FormsUsuarios";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FormsSalas } from '../Forms/FormsSala';
import { FormsReserva } from '../Forms/FormsReserva';

interface AdminPopupsProps {
    idModal: string;
    formLabel: string;
    show: boolean;
    handleClose: () => void;
    selectedUser: Usuario | null;
    onSave: (formData: any) => void;
}

interface AdminPopupsProps {
    idModal: string;
    formLabel: string;
    show: boolean;
    handleClose: () => void;
    selectedUser: Usuario | null;
    onSave: (formData: any) => void; // Passa a função de salvar para o popup
}

export const AdminPopups: React.FC<AdminPopupsProps> = ({  
    idModal,
    formLabel,
    show,
    handleClose,
    selectedUser,
    onSave,
}) => {

    const handleSave = () => {
        // Obtém os valores dos campos do formulário
        const formData = {
            id: selectedUser?.id || null, // Adiciona o ID apenas se houver um usuário selecionado
            usuario: (document.getElementById(idModal === 'Editmodal' ? 'EditName' : 'AddName') as HTMLInputElement)?.value || '',
            email: (document.getElementById(idModal === 'Editmodal' ? 'EditEmail' : 'AddEmail') as HTMLInputElement)?.value || '',
            senha: (document.getElementById(idModal === 'Editmodal' ? 'EditSenha' : 'AddSenha') as HTMLInputElement)?.value || '',
            telefone: (document.getElementById(idModal === 'Editmodal' ? 'EditTel' : 'AddTel') as HTMLInputElement)?.value || '',
            cnpj: (document.getElementById(idModal === 'Editmodal' ? 'EditCNPJ' : 'AddCNPJ') as HTMLInputElement)?.value || '',
            usertype: (document.getElementById(idModal === 'Editmodal' ? 'EditUserType' : 'AddUserType') as HTMLSelectElement)?.value || ''
        };
    
        onSave(formData); // Chama a função onSave com os dados do formulário
    };

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
                return null; // Ou algum conteúdo padrão ou mensagem de erro
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