interface Usuario {
    idUsuario: number;
    usuario: string;
    email: string;
    senha: string;
    tel: string;
    cnpj: string;
    userType: string;
}

interface FormsUsuariosProps {
    selectedUsuario: Usuario | null;
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
    selectedUsuario,
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
            {formVER === true ? 
                // Modo Visualizar
                <div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label htmlFor="">Usuario</label>
                            <p id="view_usuario" className="form-control">{selectedUsuario?.usuario}</p>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="">Email</label>
                            <p id="view_email" className="form-control">{selectedUsuario?.email}</p>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="">Senha</label>
                            <p id="view_senha" className="form-control">{selectedUsuario?.senha}</p>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="">Contato</label>
                            <p id="view_telefone" className="form-control">{selectedUsuario?.tel}</p>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="">CNPJ</label>
                            <p id="view_cnpj" className="form-control">{selectedUsuario?.cnpj}</p>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="">Tipo de usuário</label>
                            <p id="view_usertype" className="form-control">{selectedUsuario?.userType}</p>
                        </div>
                    </div>
                </div>
            : 
            // Modo Edição
            <form id={formID}>
                <div className="modal-body">
                    <div className="mb-3">
                        <label htmlFor="">Nome do Usuario</label>
                        <input type="text" name="usuario" id={idName} className="form-control" defaultValue={selectedUsuario?.usuario} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="">Email</label>
                        <input type="text" name="email" id={idEmail} className="form-control" defaultValue={selectedUsuario?.email} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="">Senha</label>
                        <input type="text" name="senha" id={idSenha} className="form-control" defaultValue={selectedUsuario?.senha} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="">Contato</label>
                        <input type="text" name="tel" id={idTell} className="form-control" defaultValue={selectedUsuario?.tel} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="">CNPJ</label>
                        <input type="text" name="cnpj" id={idCNPJ} className="form-control" defaultValue={selectedUsuario?.cnpj} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="types">Tipo de usuário:</label>
                        <select name="userType" id={idUserType} className="form-control" defaultValue={selectedUsuario?.userType}>
                            <option value="Empresa">Empresa</option>
                            <option value="Administrador">Administrador</option>
                        </select>
                    </div>
                </div>
            </form>}
        </div>
    );
};