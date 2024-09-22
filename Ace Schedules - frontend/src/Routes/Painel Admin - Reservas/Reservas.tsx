import React, { useEffect, useState } from "react";
import { AdminPopups } from "../../Core/Components/Pop-ups/AdminPopups";
import { defineApp } from "../../Core/Components/Utils/DefineApp";

export const Reservas: React.FC = () => {
    const [reservasPendentes, setReservasPendentes] = useState<any[]>([]);
    const [reservasAprovadas, setReservasAprovadas] = useState<any[]>([]);
    const [salas, setSalas] = useState<any[]>([]);
    const [filterSalaAlocada, setFilterSalaAlocada] = useState<string>("");
    const [filterDataReserva, setFilterDataReserva] = useState<string>("");
    const [filterHoraReserva, setFilterHoraReserva] = useState<string>("");
    const [filterAlocador, setFilterAlocador] = useState<string>("");
    const [filterSalaAlocadaAprovada, setFilterSalaAlocadaAprovada] = useState<string>("");
    const [filterDataReservaAprovada, setFilterDataReservaAprovada] = useState<string>("");
    const [filterHoraReservaAprovada, setFilterHoraReservaAprovada] = useState<string>("");
    const [filterAlocadorAprovada, setFilterAlocadorAprovada] = useState<string>("");
    const [totalreservasPendentes, setTotalreservasPendentes] = useState(0);
    const [totalreservasAprovadas, setTotalreservasAprovadas] = useState(0);
    const [show, setShow] = useState(false);
    const [selectedReserva, setselectedReserva] = useState<any>(null);
    const [viewMode, setViewMode] = useState(false); // Modo Visualização
    const [editMode, setEditMode] = useState(false); // Modo Edição
    const [salaAlocada, setSalaAlocada] = useState('');
    const [isAppReady, setIsAppReady] = useState(false);

    const handleAppReady = () => {
        setIsAppReady(true);
    };

    const handleClose = () => setShow(false);


    
  // Função para carregar salas
  const loadSalas = async () => {
    try {
      const response = await fetch('/api/adminPaths/Salas');
      if (response.ok) {
        const data = await response.json();
        setSalas(data.salas || []);
      } else {
        console.error("Erro ao carregar salas:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao carregar salas:", error);
    }
  };

  // Função para buscar os usuários do backend
  const loadReservasPendentes = async () => {
    try {
      const response = await fetch(
        `/api/adminPaths/Reservas/?status=0&sala=${encodeURIComponent(
          filterSalaAlocada
        )}&data=${encodeURIComponent(filterDataReserva)}&hora=${encodeURIComponent(
          filterHoraReserva
        )}&nome=${encodeURIComponent(filterAlocador)}`
      );
      if (response.ok) {
        const data = await response.json();
        setReservasPendentes(data.reservas || []);
        setTotalreservasPendentes(data.total || 0);
      } else {
        console.error("Erro ao carregar reservas pendentes:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao carregar reservas pendentes:", error);
    }
  };

  const loadReservasAprovadas = async () => {
    try {
      const response = await fetch(
        `/api/adminPaths/Reservas/?status=1&sala=${encodeURIComponent(
          filterSalaAlocadaAprovada
        )}&data=${encodeURIComponent(filterDataReservaAprovada)}&hora=${encodeURIComponent(
          filterHoraReservaAprovada
        )}&nome=${encodeURIComponent(filterAlocadorAprovada)}`
      );
      if (response.ok) {
        const data = await response.json();
        setReservasAprovadas(data.reservas || []);
        setTotalreservasAprovadas(data.total || 0);
      } else {
        console.error("Erro ao carregar reservas aprovadas:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao carregar reservas aprovadas:", error);
    }
  };

  const handleAdd = async () => {
      setViewMode(false);
      setEditMode(false);
      setselectedReserva(null);
      setShow(true);
  }

  const handleApprove = async (id: number) => {
    const formData = {
        id,
        statusOnly: true,  // Informa que apenas o status será atualizado
        newStatus: 1       // Define o novo status (1 para aprovado, por exemplo)
    };

      try {
          const endpoint = '/api/adminPaths/Reservas/Editar';
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
              loadReservasPendentes();
              loadReservasAprovadas();
          } else {
              alert(result.message);
          }
      } catch (error) {
          console.error("Erro ao aprovar reserva:", error);
      }
  };
  const handleView = async (id: number) => {
    try {
        const response = await fetch(`/api/adminPaths/Reservas/Visualizar/${id}`, {
            method: 'GET',
            headers: {
                'Cache-Control': 'no-cache' // Evita caching
            }
        });
        if (response.ok) {
            const data = await response.json();
            if (data.success) {
                // Mapear o ID da reserva e outros dados corretamente
                const adjustedData = {
                    id: data.data.id,  // Certifique-se de que este é o ID da reserva
                    data: data.data.data,
                    hora: data.data.hora,
                    idSalaAlocada: data.data.salaId,
                    salaAlocada: data.data.salaAlocada,
                    locador: data.data.locador,
                    emailLocador: data.data.emailLocador,
                    contatoLocador: data.data.contatoLocador,
                    cnpjLocador: data.data.cnpjLocador,
                    status: data.data.status
                };
                setselectedReserva(adjustedData);
                setViewMode(true);
                setEditMode(false);
                setShow(true);
            } else {
                alert(data.message);
            }
        } else {
            console.error('Erro ao carregar dados da reserva:', response.statusText);
        }
    } catch (error) {
        console.error("Erro ao buscar a reserva:", error);
    }
};

const handleEdit = async (id: number) => {
    try {
        const response = await fetch(`/api/adminPaths/Reservas/Visualizar/${id}`, {
            method: 'GET',
            headers: {
                'Cache-Control': 'no-cache' // Evita caching
            }
        });
        if (response.ok) {
            const data = await response.json();
            if (data.success) {
                // Mapear o ID da reserva e outros dados corretamente
                const adjustedData = {
                    id: data.data.id,  // Certifique-se de que este é o ID da reserva
                    data: data.data.data,
                    hora: data.data.hora,
                    salaAlocada: data.data.salaAlocada,
                    locador: data.data.locador,
                    emailLocador: data.data.emailLocador,
                    contatoLocador: data.data.contatoLocador,
                    cnpjLocador: data.data.cnpjLocador,
                    status: data.data.status
                };
                setSalaAlocada(adjustedData.salaAlocada) // mudar a opção do dropdown da sala
                setselectedReserva(adjustedData);
                setViewMode(false);
                setEditMode(true);
                setShow(true);
            } else {
                alert(data.message);
            }
        } else {
            console.error('Erro ao carregar dados da reserva:', response.statusText);
        }
    } catch (error) {
        console.error("Erro ao buscar a reserva:", error);
    }
};

  const actionSave = async (formData: any) => {
      try {
          const endpoint = editMode === true ? '/api/adminPaths/Reservas/Editar' : '/api/adminPaths/Reservas/Criar';
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
              loadReservasPendentes();
              loadReservasAprovadas();
              handleClose();
              setselectedReserva(null);
          } else {
              alert(result.message);
          }
      } catch (error) {
          console.error("Erro ao salvar reserva:", error);
      }
  };

  const actionDelete = async (id: number) => {
      try {
          const response = await fetch(`/api/adminPaths/Reservas/Deletar`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ id })
          });

          const result = await response.json();

          if (result.success) {
              alert(result.message);
              loadReservasPendentes();
              loadReservasAprovadas();
          } else {
              alert(result.message);
          }
      } catch (error) {
          console.error("Erro ao deletar reserva:", error);
      }
  };

  const renderTableRows = (reservas: any[], tableType: 'pendentes' | 'aprovados') => {
    if (reservas.length === 0) {
        return (
            <tr>
                <td colSpan={6}>Nenhuma reserva encontrada.</td>
            </tr>
        );
    }
    return reservas.map((reserva, index) => (
        <tr key={index}>
            <td>{reserva.id}</td>
            <td>{reserva.dataAgendamento}</td>
            <td>{reserva.horaAgendamento}</td>
            <td>{reserva.sala_nome}</td>
            <td>{reserva.usuario}</td>
            <td>
                <button type='button' data-id={reserva.id} className='mx-1 viewBtn btn btn-info btn-sm' onClick={() => handleView(reserva.id)}>Visualizar</button>
                {tableType === 'pendentes' && (
                    <>
                        <button type='button' data-id={reserva.id} className='mx-1 editBtn btn btn-success btn-sm' onClick={() => handleApprove(reserva.id)}>Aprovar</button>
                        <button type='button' data-id={reserva.id} className='mx-1 rejectBtn btn btn-danger btn-sm' onClick={() => actionDelete(reserva.id)}>Rejeitar</button>
                    </>
                )}
                {tableType === 'aprovados' && (
                  <>
                  <button type='button' data-id={reserva.id} className='mx-1 editBtn btn btn-success btn-sm' onClick={() => handleEdit(reserva.id)}>Editar</button>
                  <button type='button' data-id={reserva.id} className='mx-1 deleteBtn btn btn-danger btn-sm' onClick={() => actionDelete(reserva.id)}>Cancelar</button>
                  </>
                )}
            </td>
        </tr>
    ));
};
  
  useEffect(() => {
    loadReservasPendentes();
    loadReservasAprovadas();
    loadSalas();  
  }, [filterSalaAlocada, filterDataReserva, filterHoraReserva, filterAlocador, filterSalaAlocadaAprovada, filterDataReservaAprovada, filterHoraReservaAprovada, filterAlocadorAprovada]);

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
                    idModal={editMode ? 'Editmodal' : viewMode ? 'Viewmodal' : 'Addmodal'}
                    formLabel={editMode ? 'Editar reserva' : viewMode ? 'Visualizar reserva' : 'Criar reserva'}
                    show={show}
                    handleClose={handleClose}
                    selectedReserva={selectedReserva}
                    selectedUser={null}
                    onSave={actionSave}      
                    setSalaAlocada={setSalaAlocada}     
                    salaAlocada={salaAlocada}        
                    />
              </div>
        
        <div className="container mt-4">
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">
                  <h4>Agendamentos pendentes (<span id="detalhes-usuario">{totalreservasPendentes}</span>)
                  </h4>
                  <div className="w-100 flex flex items-stretch pt-3">
                    <label className="pr-1 text-black" htmlFor="sala_aprov">Sala alocada:</label>
                    <select className="!text-black !border !border-black !h-7" id="filter_sala" name="filter_sala" onChange={(e) => setFilterSalaAlocada(e.target.value)} value={filterSalaAlocada} required>
                      <option value="">--Todas as salas--</option>
                      {salas.map(sala => (
                          <option key={sala.id} value={sala.id}>{sala.nome}</option>
                      ))}
                    </select>
                    <div className="form-group">
                      <label className="pl-2 pr-1 text-black" htmlFor="data">Data da reserva:</label>
                      <input className="!text-black !border !border-black" type="date" id="filter_data" name="filter_data" onChange={(e) => setFilterDataReserva(e.target.value)} value={filterDataReserva}/>
                    </div>
                    <div className="form-group">
                      <label className="pl-2 pr-1 text-black" htmlFor="hora">Hora da reserva  :</label>
                      <input className="!text-black !border !border-black" type="time" id="filter_hora" name="filter_hora" onChange={(e) => setFilterHoraReserva(e.target.value)} value={filterHoraReserva}/>
                    </div>
                    <div className="form-group">
                      <label className="pl-2 pr-1 text-black" htmlFor="nome">Nome do alocador:</label>
                      <input className="!text-black !border !border-black" type="text" id="filter_nome" name="filter_nome" autoComplete="OFF" onChange={(e) => setFilterAlocador(e.target.value)} value={filterAlocador}/>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <table className="table table-bordered table-striped" id="reservas">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Data do agendamento</th>
                        <th>Hora do agendamento</th>
                        <th>Sala alocada</th>
                        <th>Nome do Alocador</th>
                      </tr>
                    </thead>
                    <tbody>
                      {renderTableRows(reservasPendentes, 'pendentes')}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container mt-4">
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">
                <h4>Agendamentos aprovados
                (<span id="detalhes-usuario">{totalreservasAprovadas}</span>)
                <button type="button" onClick={handleAdd} className="btn btn-primary float-end">Adicionar agendamento</button>
                </h4>
                  <div className="w-100 flex flex items-stretch pt-3">
                    <label className="pr-1 text-black" htmlFor="sala_aprov">Sala alocada:</label>
                    <select className="!text-black !border !border-black !h-7" id="sala_aprov" name="sala_aprov" onChange={(e) => setFilterSalaAlocadaAprovada(e.target.value)} value={filterSalaAlocadaAprovada} required>
                      <option value="">--Todas as salas--</option>
                      {salas.map(sala => (
                          <option key={sala.id} value={sala.id}>{sala.nome}</option>
                      ))}
                    </select>
                    <div className="form-group">
                      <label className="pl-2 pr-1 text-black" htmlFor="data_aprov">Data da reserva:</label>
                      <input className="!text-black !border !border-black" type="date" id="data_aprov" name="data_aprov" onChange={(e) => setFilterDataReservaAprovada(e.target.value)} value={filterDataReservaAprovada}/>
                    </div>
                    <div className="form-group">
                      <label className="pl-2 pr-1 text-black" htmlFor="hora_aprov">Hora da reserva:</label>
                      <input className="!text-black !border !border-black" type="time" id="hora_aprov" name="hora_aprov" onChange={(e) => setFilterHoraReservaAprovada(e.target.value)} value={filterHoraReservaAprovada}/>
                    </div>
                    <div className="form-group">
                      <label className="pl-2 pr-1 text-black" htmlFor="nome_aprov">Nome do alocador:</label>
                      <input className="!text-black !border !border-black" type="text" id="nome_aprov" name="nome_aprov" autoComplete="OFF" onChange={(e) => setFilterAlocadorAprovada(e.target.value)} value={filterAlocadorAprovada}/>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <table className="table table-bordered table-striped" id="reservas_aprov">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Data do agendamento</th>
                        <th>Hora do agendamento</th>
                        <th>Sala alocada</th>
                        <th>Nome do Alocador</th>
                      </tr>
                    </thead>
                    <tbody>
                       {renderTableRows(reservasAprovadas, 'aprovados')}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <a href="/Usuarios" className="mx-1 btn btn-primary float-end">Administração de usuários</a>
        <a href="/Salas" className="mx-1 btn btn-primary float-end">Administração de salas</a>
      </div>
    );
  } else {
    <div>
      Loading...
    </div>
  }
};