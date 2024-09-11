import React, { useEffect, useState } from "react";
import { AdminPopups } from "../../Core/Components/Pop-ups/AdminPopups";
import { defineApp } from "../../Core/Components/Utils/DefineApp";

export const Usuarios: React.FC = () => {
    const [usuarios, setUsuarios] = useState<any[]>([]);
    const [filterNome, setFilterNome] = useState<string>('');
    const [filterEmail, setFilterEmail] = useState<string>('');
    const [filterUserType, setFilterUserType] = useState<string>('');
    const [show, setShow] = useState(false);
    const [totalUsuarios, setTotalUsuarios] = useState(0);
    const [selectedUsuario, setSelectedUsuario] = useState<any>(null);
    const [viewMode, setViewMode] = useState(false); // Modo Visualização
    const [editMode, setEditMode] = useState(false); // Modo Edição
    const [isAppReady, setIsAppReady] = useState(false);

    const handleAppReady = () => {
        setIsAppReady(true);
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    // Função para buscar os usuários do backend
    const loadUsuarios = async () => {
        try {
            const response = await fetch(`/api/adminPaths/Usuarios/?nome=${encodeURIComponent(filterNome)}&email=${encodeURIComponent(filterEmail)}&user_type=${filterUserType}`);
            if (response.ok) {
                const data = await response.json();
                setUsuarios(data.Usuarios || []); // Garante que usuarios é sempre um array
                setTotalUsuarios(data.total || 0); // Garante que totalUsuarios é sempre um número
            } else {
                console.error("Erro ao carregar dados dos Usuarios:", response.statusText);
                setUsuarios([]); // Garante que usuarios é sempre um array, mesmo em caso de erro
            }
        } catch (error) {
            console.error("Erro ao carregar dados dos Usuarios:", error);
            setUsuarios([]); // Garante que usuarios é sempre um array, mesmo em caso de erro
        }
    };

    const handleView = async (id: number) => {
        // Buscar e definir o usuário selecionado
        setViewMode(true);
        setEditMode(false);
        setShow(true);
    };

    const handleEdit = async (id: number) => {
        // Buscar e definir o usuário selecionado
        setViewMode(false);
        setEditMode(true);
        setShow(true);
    };
    const handleDelete = async (id: number) => {
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
                alert(result.message);
                loadUsuarios(); // Recarrega os usuários após deletar
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error("Erro ao deletar usuário:", error);
        }
    };

    // Chamada para buscar os dados dos usuários quando o componente é montado ou quando filtros mudam
    useEffect(() => {
        loadUsuarios();
    }, [filterNome, filterEmail, filterUserType]);

    defineApp({
        cssPath: 'https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css',
        appTitle: 'Ace Schedules - Painel administrador de usuários',
        appIcon: 'src/assets/icons/calendar-alt-solid.svg',
        onReady: handleAppReady
    })

    if (isAppReady) {
        return (
            <div>
                <div>
                    <AdminPopups
                         idModal={'AddModal'}
                         formLabel={editMode ? 'Editar usuário' : 'Visualizar usuário'}
                         show={show}
                         handleClose={handleClose}
                         selectedUsuario={selectedUsuario}
                         formVER={!editMode}
                         formID="formUsuario"
                         idName="usuario"
                         idEmail="email"
                         idSenha="senha"
                         idTell="tel"
                         idCNPJ="cnpj"
                         idUserType="userType"
                         edit={editMode}
                    />
                </div>
    
                <div className="container mt-4">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4>Usuários (<span id="detalhes-usuario">{totalUsuarios}</span>)
                                        <button type="button" onClick={handleShow} className="btn btn-primary float-end">Adicionar usuário</button>
                                    </h4>
                                    <div className="flex justify-start">
                                        <div className="">
                                            <label className="pr-2 text-black" htmlFor="nome">Nome do usuário:</label>
                                            <input
                                                className="pl-2 text-black border border-black" 
                                                type="text"
                                                id="filter_nome"
                                                name="filter_nome"
                                                autoComplete="OFF"
                                                value={filterNome}
                                                onChange={(e) => setFilterNome(e.target.value)}
                                            />
                                        </div>
                                        <div className="pl-2">
                                            <label className="pr-2 text-black" htmlFor="email">Selecione o email:</label>
                                            <input
                                                className="pl-2 text-black border border-black" 
                                                type="email"
                                                id="filter_Email"
                                                name="filter_Email"
                                                value={filterEmail}
                                                onChange={(e) => setFilterEmail(e.target.value)}
                                            />
                                        </div>
                                        <div className="pl-2">
                                            <label className="pr-2 text-black" htmlFor="user">Selecione o tipo de usuário:</label>
                                            <select
                                                className="pl-2 text-black border border-black"
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
                                                <th>Senha</th>
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
                                                    <td>{usuario.senha}</td>
                                                    <td>{usuario.usertype}</td>
                                                    <td>
                                                        <button type='button' data-id={usuario.id} className='mx-1 viewBtn btn btn-info btn-sm'onClick={() => handleView(usuario.id)}>View</button>
                                                        <button type='button' data-id={usuario.id} className='mx-1 editBtn btn btn-success btn-sm'>Edit</button>
                                                        <button type='button' data-id={usuario.id} onClick={() => handleDelete(usuario.id)} className='mx-1 deleteBtn btn btn-danger btn-sm'>Delete</button>
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
                <a href="/Salas" className="mx-1 btn btn-primary float-end">Administração de salas</a>
                <a href="/Reservas" className="mx-1 btn btn-primary float-end">Administração de reservas</a>
            </div>
        );
    } else {
        return (
            <div>Loading...</div>
        )
    }
};