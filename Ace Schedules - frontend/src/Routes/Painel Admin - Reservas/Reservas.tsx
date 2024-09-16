import React, { useEffect, useState } from "react";
import { AdminPopups } from "../../Core/Components/Pop-ups/AdminPopups";
import { defineApp } from "../../Core/Components/Utils/DefineApp";

export const Reservas: React.FC = () => {
    const [reservas, setreservas] = useState<any[]>([]);
    const [filterSalaAlocada, setFilterSalaAlocada] = useState<string>('');
    const [filterDataReserva, setFilterDataReserva] = useState<string>('');
    const [filterHoraReserva, setFilterHoraReserva] = useState<string>('');
    const [filterAlocador, setFilterAlocador] = useState<string>('');
    const [show, setShow] = useState(false);
    const [totalreservas, setTotalreservas] = useState(0);
    const [totalreservasAprov, setTotalreservasAprov] = useState(0);
    const [selectedElement, setselectedElement] = useState<any>(null);
    const [viewMode, setViewMode] = useState(false); // Modo Visualização
    const [editMode, setEditMode] = useState(false); // Modo Edição
    const [isAppReady, setIsAppReady] = useState(false);

    const handleAppReady = () => {
        setIsAppReady(true);
    };

    const handleClose = () => setShow(false);

  // Função para buscar os usuários do backend
  const loadreservas = async () => {
      try {
          const response = await fetch(`/api/adminPaths/reservas/?sala=${encodeURIComponent(filterSalaAlocada)}&DataReserva=${encodeURIComponent(filterDataReserva)}&HoraReserva=${encodeURIComponent(filterHoraReserva)}&Alocador=${filterAlocador}`);
          if (response.ok) {
              const data = await response.json();
              setreservas(data.reservas || []); 
              setTotalreservas(data.total || 0); 
              setTotalreservasAprov(data.total || 0);
          } else {
              console.error("Erro ao carregar dados dos reservas:", response.statusText);
              setreservas([]); // Garante que reservas é sempre um array, mesmo em caso de erro
          }
      } catch (error) {
          console.error("Erro ao carregar dados dos reservas:", error);
          setreservas([]); // Garante que reservas é sempre um array, mesmo em caso de erro
      }
  };
  const handleAdd = async () => {
      setViewMode(false);
      setEditMode(false);
      setselectedElement(null);
      setShow(true);
  }

  const handleView = async (id: number) => {
      try {
          const response = await fetch(`/api/adminPaths/reservas/Visualizar/${id}`);
          if (response.ok) {
              const data = await response.json();
              if (data.success) {
                  setselectedElement(data.data); // Define o usuário selecionado no estado
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
          const response = await fetch(`/api/adminPaths/reservas/Visualizar/${id}`);
          if (response.ok) {
              const data = await response.json();
              if (data.success) {
                  setselectedElement(data.data); // Define o usuário selecionado no estado
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
          const endpoint = editMode === true ? '/api/adminPaths/reservas/Editar' : '/api/adminPaths/reservas/Criar';
          const response = await fetch(endpoint, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(formData) // O formData agora inclui o campo id
          });
  
          const result = await response.json();
  
          if (result.success) {
              alert(result.message);
              loadreservas(); // Atualiza a lista de usuários após salvar
              handleClose(); // Fecha o modal após salvar
          } else {
              alert(result.message);
          }
      } catch (error) {
          console.error("Erro ao salvar usuário:", error);
      }
  };

  const actionDelete = async (id: number) => {
      try {
          const response = await fetch(`/api/adminPaths/reservas/Deletar`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ id })
          });

          const result = await response.json();

          if (result.success) {
              alert(result.message);
              loadreservas(); 
          } else {
              alert(result.message);
          }
      } catch (error) {
          console.error("Erro ao deletar usuário:", error);
      }
  };

  // Chamada para buscar os dados dos usuários quando o componente é montado ou quando filtros mudam
  useEffect(() => {
      loadreservas();
  }, [filterSalaAlocada,filterDataReserva, filterHoraReserva, filterAlocador]);

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
                        formLabel={editMode ? 'Editar usuário' : viewMode ? 'Visualizar usuário' : 'Criar usuário'}
                        show={show}
                        handleClose={handleClose}
                        selectedElement={selectedElement}
                        onSave={actionSave}
                  />
              </div>
        
        <div className="container mt-4">
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">
                  <h4>Agendamentos pendentes (<span id="detalhes-usuario">{totalreservas}</span>)
                  </h4>
                  <div className="w-100 flex flex items-stretch pt-3">
                    <label className="pr-1 text-black" htmlFor="sala_aprov">Sala alocada:</label>
                    <select className="!text-black !border !border-black !h-7" id="filter_sala" name="filter_sala" onChange={(e) => setFilterSalaAlocada(e.target.value)} value={filterSalaAlocada} required>
                      <option value="">--Todas as salas--</option>
                      {/* Aqui você pode adicionar a lógica para carregar as salas */}
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
                      {renderTableRows(reservas)}
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
                (<span id="detalhes-usuario">{totalreservasAprov}</span>)
                <button type="button" onClick={handleShow} className="btn btn-primary float-end">Adicionar agendamento</button>
                </h4>
                  <div className="w-100 flex flex items-stretch pt-3">
                    <label className="pr-1 text-black" htmlFor="sala_aprov">Sala alocada:</label>
                    <select className="!text-black !border !border-black !h-7" id="sala_aprov" name="sala_aprov" onChange={(e) => setFilterSalaAlocada(e.target.value)} value={filterSalaAlocada} required>
                      <option value="">--Todas as salas--</option>
                      {/* Aqui você pode adicionar a lógica para carregar as salas */}
                    </select>
                    <div className="form-group">
                      <label className="pl-2 pr-1 text-black" htmlFor="data_aprov">Data da reserva:</label>
                      <input className="!text-black !border !border-black" type="date" id="data_aprov" name="data_aprov" onChange={(e) => setFilterDataReserva(e.target.value)} value={filterDataReserva}/>
                    </div>
                    <div className="form-group">
                      <label className="pl-2 pr-1 text-black" htmlFor="hora_aprov">Hora da reserva:</label>
                      <input className="!text-black !border !border-black" type="time" id="hora_aprov" name="hora_aprov" onChange={(e) => setFilterHoraReserva(e.target.value)} value={filterHoraReserva}/>
                    </div>
                    <div className="form-group">
                      <label className="pl-2 pr-1 text-black" htmlFor="nome_aprov">Nome do alocador:</label>
                      <input className="!text-black !border !border-black" type="text" id="nome_aprov" name="nome_aprov" autoComplete="OFF" onChange={(e) => setFilterAlocador(e.target.value)} value={filterAlocador}/>
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
                      {renderTableRows(reservasAprov)}
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