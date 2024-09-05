interface FormsUsuariosProps {
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
        formVER,
        formID,
        idName,
        idEmail,
        idSenha,
        idTell,
        idCNPJ,
        idUserType,
        edit,

  
}) => {
return (
<div>
{formVER === true ? 
        <form id={formID}>
            <div className="modal-body">

                <div id="errorMessage" className="alert alert-warning d-none"></div>

                {edit === true ? 
                    <input type="hidden" name="id" id="id"/>
                :<div/>}

                <div className="mb-3">
                    <label htmlFor="">Nome do Usuario</label>
                    <input type="text" name="usuario" id={idName} className="form-control" autoComplete="off"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="">Email</label>
                    <input type="text" name="email" id={idEmail} className="form-control" autoComplete="off"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="">Senha</label>
                    <input type="text" name="senha" id={idSenha} className="form-control" autoComplete="off" />
                </div>
                <div className="mb-3">
                    <label htmlFor="">Contato</label>
                    <input type="text" name="tel" id={idTell} className="form-control" autoComplete="off"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="">CNPJ</label>
                    <input type="text" name="cnpj" id={idCNPJ} className="form-control" autoComplete="off"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="types" id="userType">Tipo de usuário:</label>
                    <select name="userType" id={idUserType} className="form-control">
                        <option value="Empresa">Empresa</option>
                        <option value="Administrador">Administrador</option>
                    </select>
                </div>
            </div>
        </form>
        : 
        // Visualizar
        <div>
            <div className="modal-body">
                    <div className="mb-3">
                        <label htmlFor="">Usuario</label>
                        <p id="view_usuario" className="form-control"></p>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="">Email</label>
                        <p id="view_email" className="form-control"></p>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="">Senha</label>
                        <p id="view_senha" className="form-control"></p>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="">Contato</label>
                        <p id="view_telefone" className="form-control"></p>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="">CNPJ</label>
                        <p id="view_cnpj" className="form-control"></p>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="">Tipo de usuário</label>
                        <p id="view_usertype" className="form-control"></p>
                    </div>
                </div>
            <div className="modal-footer"></div>
        </div>}            
</div>
)};