import React, { useState } from "react";
import { AdminPopups } from "../../Core/Components/Utils/AdminPopups";

export const Usuarios: React.FC = () => {
    // Controle do estado do modal
    const [show, setShow] = useState(false);
    
    // Funções para abrir e fechar o modal
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return ( 
        <div>
            <div>
                <AdminPopups
                    idModal={'AddModal'}
                    formLabel={'Adicionar usuarios'}
                    show={show}
                    handleClose={handleClose}
                />
            </div>

            <div className="container mt-4">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>Detalhes do usuário (<span id="detalhes-usuario">0</span>)
                                    <button type="button" onClick={handleShow} className="btn btn-primary float-end">Adicionar usuário</button>
                                    <a href="/Salas" className="btn btn-primary float-end">Administração de salas</a>
                                    <a href="/Reservas" className="btn btn-primary float-end">Administração de reservas</a>
                                </h4>
                                <div>
                                    <div className="form-group">
                                        <label htmlFor="nome">Nome do alocador:</label>
                                        <input type="text" id="nome" name="nome" autoComplete="OFF"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Selecione o email:</label>
                                        <input type="email" id="selectMail" name="selectMail"/>
                                    </div>
                                    Selecione o tipo de usuário:
                                    <select id="user" name="user" required>
                                        <option value="">---Todos---</option>
                                        <option value="Empresa">Empresa</option>
                                        <option value="Administrador">Administrador</option>
                                    </select>
                                </div>
                            </div>
                            <div className="card-body">
                                <table className="table table-bordered table-striped" id="usuarios">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Usuário</th>
                                            <th>Email</th>
                                            <th>Senha</th>
                                            <th>Tipo de Usuário</th>
                                            <th>Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* <!-- Dados dos usuários serão carregados dinamicamente --> */}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};