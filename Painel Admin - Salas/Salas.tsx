
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from "react";
import { AdminPopups } from '../../Core/Components/Utils/AdminPopups';

export const Salas: React.FC = () => {
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
                    formLabel={'Adicionar Salas'}
                    show={show}
                    handleClose={handleClose}
                />

                {/* <!-- Tabela --> */}
            </div>
            <div className="container mt-4">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>
                                    <span id="quantidade_salas_text">Salas: (<span id="total_salas">0</span>); </span>
                                    Salas bloqueadas: (<span id="bloqueadas_salas">0</span>)
                                    <button type="button" onClick={handleShow} className="btn btn-primary float-end">Adicionar sala</button>
                                    <a href="/Usuarios" className="btn btn-primary float-end">Administração de usuários</a>
                                    <a href="/Reservas" className="btn btn-primary float-end">Administração de reservas</a>
                                    <div className="form-group">
                                        <label htmlFor="filter_nome">Nome da sala:</label>
                                        <input type="text" id="filter_nome" name="filter_nome" autoComplete="OFF"/>
                                        <label htmlFor="filter_capacidade">Capacidade da sala:</label>
                                        <input type="number" id="filter_capacidade" name="filter_capacidade" autoComplete="OFF"/>
                                        <label>Mostrar apenas bloqueadas</label>
                                        <input type="checkbox" id="apenas_bloqueadas" name="apenas_bloqueadas"/>
                                    </div>
                                </h4>
                            </div>
                            <div className="card-body">
                                <table className="table table-bordered table-striped" id="salas">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Nome da Sala</th>
                                            <th>Capacidade</th>
                                            <th>Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* <!-- As salas serão carregadas aqui --> */}
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