import React, { useEffect, useState } from "react";
import { AdminPopups } from "../../Core/Components/Pop-ups/AdminPopups";
import { handleAlert, ResponsePopup } from "../../Core/Components/Pop-ups/ResponsePopup";
import { AdminSidebar } from "../../Core/Components/Sidebars/AdminSidebar";

// import 'bootstrap/dist/css/bootstrap.min.css';

export const Usuarios: React.FC = () => {
    const [usuarios, setUsuarios] = useState<any[]>([]);
    const [filterNome, setFilterNome] = useState<string>('');
    const [filterEmail, setFilterEmail] = useState<string>('');
    const [filterUserType, setFilterUserType] = useState<string>('');
    const [show, setShow] = useState(false);
    const [totalUsuarios, setTotalUsuarios] = useState(0);
    const [selectedUser, setselectedUser] = useState<any>(null);
    const [viewMode, setViewMode] = useState(false); 
    const [editMode, setEditMode] = useState(false); 
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleClose = () => setShow(false);


    const loadUsuarios = async () => {
        try {
            const response = await fetch(`/api/adminPaths/Usuarios/?nome=${encodeURIComponent(filterNome)}&email=${encodeURIComponent(filterEmail)}&user_type=${filterUserType}`);
            if (response.ok) {
                const data = await response.json();
                setUsuarios(data.Usuarios || []); 
                setTotalUsuarios(data.total || 0);
            } else {
                console.error("Erro ao carregar dados dos Usuarios:", response.statusText);
                setUsuarios([]);
            }
        } catch (error) {
            console.error("Erro ao carregar dados dos Usuarios:", error);
            setUsuarios([]);
        }
    };
    const handleAdd = async () => {
        setViewMode(false);
        setEditMode(false);
        setselectedUser(null);
        setShow(true);
    }

    const handleView = async (id: number) => {
        try {
            const response = await fetch(`/api/adminPaths/Usuarios/Visualizar/${id}`);
            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    setselectedUser(data.data);
                } else {
                    alert(data.message);
                }
            } else {
                console.error('Erro ao carregar dados do usuário:', response.statusText);
            }
            setViewMode(true);
            setEditMode(false);
            setShow(true);
        } catch (error) {
            console.error("Erro ao buscar o usuário:", error);
        }
    };

    const handleEdit = async (id: number) => {
        try {
            const response = await fetch(`/api/adminPaths/Usuarios/Visualizar/${id}`);
            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    setselectedUser(data.data);
                } else {
                    alert(data.message);
                }
            } else {
                console.error('Erro ao carregar dados do usuário:', response.statusText);
            }
            setViewMode(false);
            setEditMode(true);
            setShow(true);
        } catch (error) {
            console.error("Erro ao buscar o usuário:", error);
        }
    };

    const actionSave = async (formData: any) => {
        try {
            const endpoint = editMode === true ? '/api/adminPaths/Usuarios/Editar' : '/api/adminPaths/Usuarios/Criar';
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
    
            const result = await response.json();
    
            if (result.success) {
                alert(result.message);
                loadUsuarios();
                handleClose();
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error("Erro ao salvar usuário:", error);
        }
    };

    const actionDelete = async (id: number) => {
        try {
            const response = await fetch(`/api/adminPaths/Usuarios/Deletar`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id })
            });

            const result = await response.json();

            if (result.success) {
                setSuccess(result.message);
                setError('');
                loadUsuarios();
            } else {
                setError(result.message);
                setSuccess('');
            }
        } catch (error) {
            console.error("Erro ao deletar usuário:", error);
            setError('Não foi possível fazer deletar o usuário no momento. Tente novamente mais tarde.');
            setSuccess('');
        }
        
        setTimeout(() => {
            handleAlert();
        }, 50)
    };

    useEffect(() => {
        loadUsuarios();
    }, [filterNome, filterEmail, filterUserType]);

    return (

        <AdminSidebar>
            <AdminPopups
                idModal={editMode ? 'Editmodal' : viewMode ? 'Viewmodal' : 'Addmodal'}
                formLabel={editMode ? 'Editar usuário' : viewMode ? 'Visualizar usuário' : 'Criar usuário'}
                show={show}
                handleClose={handleClose}
                selectedUser={selectedUser}
                onSave={actionSave}               
            />

            <div className="container mt-4 xl:!max-w-[75%]">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>Usuários (<span id="detalhes-usuario">{totalUsuarios}</span>)
                                    <button type="button" onClick={handleAdd} className="btn btn-primary float-end">Adicionar usuário</button>
                                </h4>
                                <div className="flex justify-start pt-3 w-100">
                                    <div className="">
                                        <label className="pr-2 text-black" htmlFor="nome">Nome do usuário:</label>
                                        <input
                                            className="!text-black !border !border-black p-[0.1rem]" 
                                            type="text"
                                            id="filter_nome"
                                            name="filter_nome"
                                            autoComplete="OFF"
                                            value={filterNome}
                                            onChange={(e) => setFilterNome(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="pr-2 pl-2 text-black border-width: 2px;" htmlFor="email">Selecione o email:</label>
                                        <input
                                            className="!text-black !border !border-black p-[0.1rem]" 
                                            type="email"
                                            id="filter_Email"
                                            name="filter_Email"
                                            value={filterEmail}
                                            onChange={(e) => setFilterEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className="pl-2">
                                        <label className="pl-2 pr-2 text-black" htmlFor="user">Selecione o tipo de usuário:</label>
                                        <select
                                            className="!text-black !border !border-black p-[0.1rem]"
                                            id="filter_user"
                                            name="filter_user"
                                            value={filterUserType}
                                            onChange={(e) => setFilterUserType(e.target.value)}
                                        >
                                            <option value="">---Todos---</option>
                                            <option value="Empresa">Empresa</option>
                                            <option value="Administrador">Administrador</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <table className="table table-bordered table-striped" id="usuarios">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Usuário</th>
                                            <th>Email</th>
                                            <th>Tipo de Usuário</th>
                                            <th>Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {usuarios.length > 0 ? usuarios.map((usuario) => (
                                            <tr key={usuario.id}>
                                                <td>{usuario.id}</td>
                                                <td>{usuario.usuario}</td>
                                                <td>{usuario.email}</td>
                                                <td>{usuario.usertype}</td>
                                                <td className="!flex !justify-end">
                                                    <button type='button' data-id={usuario.id} className='mx-1 viewBtn btn btn-info btn-sm' onClick={() => handleView(usuario.id)}>Visualizar</button>
                                                    <button type='button' data-id={usuario.id} className='mx-1 editBtn btn btn-success btn-sm' onClick={() => handleEdit(usuario.id)}>Editar</button>
                                                    <button type='button' data-id={usuario.id} className='mx-1 deleteBtn btn btn-danger btn-sm' onClick={() => actionDelete(usuario.id)} >Deletar</button>
                                                </td>
                                            </tr>
                                        )):<tr><td colSpan={6}>Nenhum usuario encontrado.</td></tr>}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ResponsePopup 
                type={error ? 'error' : 'success'} 
                redirectLink={''}
                title={error ? 'Erro' : 'Pronto!'} 
                description={error || success} 
            />
        </AdminSidebar>
    );
};