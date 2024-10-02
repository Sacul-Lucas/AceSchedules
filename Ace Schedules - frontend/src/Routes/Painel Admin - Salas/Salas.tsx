import React, { useEffect, useState } from "react";
import { AdminPopups } from '../../Core/Components/Pop-ups/AdminPopups';
import { AdminSidebar } from "../../Core/Components/Sidebars/AdminSidebar";

export const Salas: React.FC = () => {
    const [show, setShow] = useState(false);
    const [salas, setSalas] = useState<any[]>([]);
    const [totalSalas, setTotalSalas] = useState(0);
    const [bloqueadasSalas, setBloqueadasSalas] = useState(0);
    const [selectedSala, setSelectedSala] = useState<any>(null);
    const [viewMode, setViewMode] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [filterNome, setFilterNome] = useState('');
    const [apenasBloqueadas, setApenasBloqueadas] = useState(false);

    const handleClose = () => setShow(false);

    const handleAdd = async () => {
        setViewMode(false);
        setEditMode(false);
        setSelectedSala(null);
        setShow(true);
    }

    const handleView = async (id: number) => {
        try {
            const response = await fetch(`/api/adminPaths/Salas/Visualizar/${id}`);
            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    const adjustedData = {
                        id: data.data.id,
                        nome: data.data.nome,
                        descricao: data.data.descricao,
                        status: data.data.status,
                        backImg: data.data.backImg,
                        caracteristicas: data.data.caracteristicas,
                      };
                    setSelectedSala(adjustedData);
                } else {
                    alert(data.message);
                }
            } else {
                console.error('Erro ao carregar dados da sala:', response.statusText);
            }
            setViewMode(true);
            setEditMode(false);
            setShow(true);
        } catch (error) {
            console.error("Erro ao buscar a sala:", error);
        }
    };

    const handleEdit = async (id: number) => {
        try {
            const response = await fetch(`/api/adminPaths/Salas/Visualizar/${id}`);
            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    const adjustedData = {
                        id: data.data.id,
                        nome: data.data.nome,
                        descricao: data.data.descricao,
                        status: data.data.status,
                        backImg: data.data.backImg,
                        caracteristicas: data.data.caracteristicas,
                    };
                    setSelectedSala(adjustedData);
                    console.log(adjustedData.backImg)
                } else {
                    alert(data.message);
                }
            } else {
                console.error('Erro ao carregar dados da sala:', response.statusText);
            }
            setViewMode(false);
            setEditMode(true);
            setShow(true);
        } catch (error) {
            console.error("Erro ao buscar a sala:", error);
        }
    };

    const actionSave = async (formData: any) => {
        console.log(formData.get('backImg')); // Verifica se o arquivo da imagem está presente
        try {
            const endpoint = editMode === true ? '/api/adminPaths/Salas/Editar' : '/api/adminPaths/Salas/Criar';
            const response = await fetch(endpoint, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json',
                },
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Erro HTTP: ${response.status}`);
            }
    
            const data = await response.json();
            console.log('Sala salva com sucesso:', data);
            loadSalas();
            handleClose();
            setSelectedSala(null);
    
        } catch (error) {
            // Lidar com error de tipo unknown
            let errorMessage = 'Ocorreu um erro desconhecido';
    
            if (error instanceof Error) {
                errorMessage = error.message;  // Pega a mensagem de erro
            }
    
            console.error('Erro ao salvar sala:', errorMessage);
            alert(`Erro: ${errorMessage}`);
        }
    };

    const loadSalas = async () => {
        try {
            const response = await fetch(`/api/adminPaths/Salas?filter_nome=${encodeURIComponent(filterNome)}&apenas_bloqueadas=${apenasBloqueadas}`);
            if (response.ok) {
                const data = await response.json();
                setSalas(data.salas);
                setTotalSalas(data.total);
                setBloqueadasSalas(data.bloqueadas);
            } else {
                console.error("Erro ao carregar dados das salas:", response.statusText);
            }
        } catch (error) {
            console.error("Erro ao carregar dados das salas:", error);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(`/api/adminPaths/Salas/Deletar`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id })
            });

            const result = await response.json();

            if (result.success) {
                alert(result.message);
                loadSalas();
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error("Erro ao deletar sala:", error);
        }
    };

    useEffect(() => {
        loadSalas();
    }, [filterNome, apenasBloqueadas]);

    return (
        <AdminSidebar>
            <AdminPopups
                idModal={editMode ? 'Editmodal' : viewMode ? 'Viewmodal' : 'Addmodal'}
                formLabel={editMode ? 'Editar sala' : viewMode ? 'Visualizar sala' : 'Criar sala'}
                selectedSala={selectedSala}
                show={show}
                handleClose={handleClose}
                onSave={actionSave}     
            />

            <div className="container mt-4 xl:!max-w-[75%]">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>
                                    {!apenasBloqueadas && (
                                        <span id="quantidade_salas_text">
                                            Salas: (<span id="total_salas">{totalSalas}</span>);
                                        </span>
                                    )}
                                    Salas bloqueadas: (<span id="bloqueadas_salas">{bloqueadasSalas}</span>)
                                    <button type="button" onClick={handleAdd} className="btn btn-primary float-end">Adicionar sala</button>
                                    <div className="flex items-center justify-start pt-3 text-lg align-middle w-100">
                                        <label className="pr-2 !m-0 text-black" htmlFor="filter_nome">Nome da sala:</label>
                                        <input 
                                            className="pl-2 !text-black !border !border-black !h-7 p-[0.1rem]" 
                                            type="text" 
                                            id="filter_nome" 
                                            name="filter_nome" 
                                            autoComplete="OFF" 
                                            value={filterNome}
                                            onChange={(e) => setFilterNome(e.target.value)}
                                        />
                                        <label htmlFor="apenas_bloqueadas" className="pl-2 pr-2 !m-0 text-black">Mostrar apenas bloqueadas</label>
                                        <input 
                                            className="!text-black !border !border-black !h-7 p-[0.1rem]" 
                                            type="checkbox" 
                                            id="apenas_bloqueadas" 
                                            name="apenas_bloqueadas" 
                                            checked={apenasBloqueadas}
                                            onChange={(e) => setApenasBloqueadas(e.target.checked)}
                                        />
                                    </div>
                                </h4>
                            </div>
                            <div className="card-body">
                                <table className="table table-bordered table-striped" id="salas">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Nome da Sala</th>
                                            <th>Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {salas.length > 0 ? salas.map(sala => (
                                            <tr key={sala.id}>
                                                <td>{sala.id}</td>
                                                <td style={{ color: sala.status === '1' ? 'red' : '' }}>{sala.nome}</td>
                                                <td className="!flex !justify-end">
                                                    <button type='button' data-id={sala.id} onClick={() => handleView(sala.id)} className='mx-1 viewBtn btn btn-info btn-sm'>Visualizar</button>
                                                    <button type='button' data-id={sala.id} onClick={() => handleEdit(sala.id)} className='mx-1 editBtn btn btn-success btn-sm'>Editar</button>
                                                    <button type='button' data-id={sala.id} onClick={() => handleDelete(sala.id)} className='mx-1 deleteBtn btn btn-danger btn-sm'>Deletar</button>
                                                </td>
                                            </tr>
                                        )) : (
                                            <tr><td colSpan={5}>Nenhuma sala encontrada.</td></tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminSidebar>
    );
};
