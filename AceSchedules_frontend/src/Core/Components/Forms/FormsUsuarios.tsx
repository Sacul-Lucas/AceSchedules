import { IMaskInput } from "react-imask";

export interface Usuario {
    id: number;
    usuario: string;
    email: string;
    senha: string;
    telefone: string;
    cnpj: string;
    usertype: string;
}

interface FormsUsuariosProps {
    selectedUser: Usuario | null;
    formVER: boolean;
    formID: string;
    idName: string;
    idEmail: string;
    idSenha: string;
    idTell: string;
    idCNPJ: string;
    idUserType: string;
    edit: boolean;
}

export const FormsUsuarios: React.FC<FormsUsuariosProps> = ({
    selectedUser,
    formVER,
    formID,
    idName,
    idEmail,
    idSenha,
    idTell,
    idCNPJ,
    idUserType,
    edit
}) => {
    return (
        <div>
            {formVER === false ? 
                <div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label htmlFor="view_usuario">Usuário</label>
                            <p id="view_usuario" className="form-control">{selectedUser?.usuario}</p>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="view_email">Email</label>
                            <p id="view_email" className="form-control text-ellipsis overflow-hidden whitespace-nowrap overflow-x-auto">{selectedUser?.email}</p>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="view_telefone">Contato</label>
                            <p id="view_telefone" className="form-control">{selectedUser?.telefone}</p>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="view_cnpj">CNPJ</label>
                            <p id="view_cnpj" className="form-control">{selectedUser?.cnpj}</p>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="view_usertype">Tipo de usuário</label>
                            <p id="view_usertype" className="form-control">{selectedUser?.usertype}</p>
                        </div>
                    </div>
                </div>
            :
            <form id={formID}>
                <div className="modal-body">
                    <div className="mb-3">
                        <label htmlFor="">Nome do Usuario</label>
                        <input
                            type="text"
                            name={idName}
                            id={idName}
                            className="form-control"
                            placeholder="Insira o nome do usuário"
                            defaultValue={selectedUser?.usuario}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="">Email</label>
                        <input
                            type="text"
                            name={idEmail}
                            id={idEmail}
                            className="form-control"
                            placeholder="Insira o email do usuário"
                            defaultValue={selectedUser?.email}
                        />
                    </div>
            {!edit && ( // Exibir o campo "Senha" apenas se "edit" for falso
                    <div className="mb-3">
                        <label htmlFor="">Senha</label>
                        <input
                            type="text"
                            name={idSenha}
                            id={idSenha}
                            className="form-control w-full"
                            placeholder="Insira a senha do usuário"
                            defaultValue={selectedUser?.senha}
                        />
                    </div>
                )}
                    <div className="mb-3">
                        <label htmlFor="">Contato</label>
                        <IMaskInput        
                        className="form-control"   
                        mask="+{55} (00) 00000-0000"
                        definitions={{
                          '0': /[0-9]/
                        }}
                        unmask="typed" 
                        type="text" 
                        id={idTell}
                        name={idTell}
                        placeholder="Insira o telefone" 
                        defaultValue={selectedUser?.telefone}
                        required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="">CNPJ</label>
                        <IMaskInput 
                            mask="00.000.000/0000-00"                                                 
                            definitions={{
                                '0': /[0-9]/
                            }}
                            unmask="typed"  
                            type="text" 
                            id={idCNPJ}
                            name={idCNPJ}
                            placeholder="Insira o cnpj" 
                            defaultValue={selectedUser?.cnpj}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="types">Tipo de usuário:</label>
                        <select
                            name={idUserType}
                            id={idUserType}
                            className="form-control"
                            defaultValue={selectedUser?.usertype}
                        >
                            <option value="Empresa">Empresa</option>
                            <option value="Administrador">Administrador</option>
                        </select>
                    </div>
                </div>
            </form>}
        </div>
    );
};