import React, { useEffect, useState } from "react";
import { AdminPopups } from '../../Core/Components/Pop-ups/AdminPopups';
import { AdminSidebar } from "../../Core/Components/Sidebars/AdminSidebar";

export const Salas: React.FC = () => {
    const [show, setShow] = useState(false);
    const [salas, setSalas] = useState<any[]>([]);
    const [totalSalas, setTotalSalas] = useState(0);
    const [bloqueadasSalas, setBloqueadasSalas] = useState(0);

    const [filterNome, setFilterNome] = useState('');
    const [filterCapacidade, setFilterCapacidade] = useState('');
    const [apenasBloqueadas, setApenasBloqueadas] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const loadSalas = async () => {
        try {
            const response = await fetch(`/api/adminPaths/Salas?filter_nome=${encodeURIComponent(filterNome)}&filter_capacidade=${encodeURIComponent(filterCapacidade)}&apenas_bloqueadas=${apenasBloqueadas}`);
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
    // Função para deletar uma sala
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
                loadSalas(); // Recarrega as salas após deletar
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error("Erro ao deletar sala:", error);
        }
    };
    // Efeito para carregar as salas quando os filtros mudarem
    useEffect(() => {
        loadSalas();
    }, [filterNome, filterCapacidade, apenasBloqueadas]);


    return (
        <AdminSidebar>
            <AdminPopups
                idModal={'AddModal'}
                formLabel={'Adicionar Salas'}
                show={show}
                handleClose={handleClose} selectedUsuario={0}            
            />

            <div className="container mt-4">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>
                                    <span id="quantidade_salas_text">Salas: (<span id="total_salas">{totalSalas}</span>); </span>
                                    Salas bloqueadas: (<span id="bloqueadas_salas">{bloqueadasSalas}</span>)
                                    <button type="button" onClick={handleShow} className="btn btn-primary float-end">Adicionar sala</button>
                                    <div className="flex justify-start pt-4 text-base">
                                        <label className="pr-2 !m-0 text-black" htmlFor="filter_nome">Nome da sala:</label>
                                        <input 
                                            className="pl-2 text-black border border-black" 
                                            type="text" 
                                            id="filter_nome" 
                                            name="filter_nome" 
                                            autoComplete="OFF" 
                                            value={filterNome}
                                            onChange={(e) => setFilterNome(e.target.value)}
                                        />
                                        <label className="pl-2 pr-2 !m-0 text-black" htmlFor="filter_capacidade">Capacidade da sala:</label>
                                        <input 
                                            className="pl-2 text-black border border-black" 
                                            type="number" 
                                            id="filter_capacidade" 
                                            name="filter_capacidade" 
                                            autoComplete="OFF" 
                                            value={filterCapacidade}
                                            onChange={(e) => setFilterCapacidade(e.target.value)}
                                        />
                                        <label className="pl-2 pr-2 !m-0 text-black">Mostrar apenas bloqueadas</label>
                                        <input 
                                            className="text-black border border-black" 
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
                                            <th>Capacidade</th>
                                            <th>Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {salas.length > 0 ? salas.map(sala => (
                                            <tr key={sala.id}>
                                                <td>{sala.id}</td>
                                                <td style={{ color: sala.status === 1 ? 'red' : '' }}>{sala.nome}</td>
                                                <td>{sala.capacidade}</td>
                                                <td>
                                                    <button type='button' data-id={sala.id} className='mx-1 viewBtn btn btn-info btn-sm'>Visualizar</button>
                                                    <button type='button' data-id={sala.id} className='mx-1 editBtn btn btn-success btn-sm'>Editar</button>
                                                    <button type='button' data-id={sala.id} onClick={() => handleDelete(sala.id)} className='mx-1 deleteBtn btn btn-danger btn-sm'>Deletar</button>
                                                </td>
                                            </tr>
                                        )) : (
                                            <tr><td colSpan={4}>Nenhuma sala encontrada.</td></tr>
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