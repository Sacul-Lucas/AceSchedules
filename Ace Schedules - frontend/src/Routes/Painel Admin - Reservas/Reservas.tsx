import React, { useEffect, useState } from "react";
import { AdminPopups } from "../../Core/Components/Pop-ups/AdminPopups";
import { AdminSidebar } from "../../Core/Components/Sidebars/AdminSidebar";

export const Reservas: React.FC = () => {
  const [show, setShow] = useState(false);
  const [reservas, setReservas] = useState<any[]>([]);
  const [reservasAprov, setReservasAprov] = useState<any[]>([]);

  // Estados para os filtros
  const [filterSala, setFilterSala] = useState('');
  const [filterData, setFilterData] = useState('');
  const [filterHora, setFilterHora] = useState('');
  const [filterNome, setFilterNome] = useState('');

  // Funções para abrir e fechar o modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Função para carregar reservas
  const loadReservas = async () => {
    try {
      const response = await fetch(`/api/adminPaths/Reservas?sala_id=${encodeURIComponent(filterSala)}&data=${encodeURIComponent(filterData)}&hora=${encodeURIComponent(filterHora)}&nome=${encodeURIComponent(filterNome)}&status=0`);
      if (response.ok) {
        const data = await response.json();
        setReservas(data.reservas || []);
      } else {
        console.error("Erro ao carregar reservas:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao carregar reservas:", error);
    }
  };

  // Função para carregar reservas aprovadas
  const loadReservasAprov = async () => {
    try {
      const response = await fetch(`/api/adminPaths/Reservas?sala_id=${encodeURIComponent(filterSala)}&data=${encodeURIComponent(filterData)}&hora=${encodeURIComponent(filterHora)}&nome=${encodeURIComponent(filterNome)}&status=1`);
      if (response.ok) {
        const data = await response.json();
        setReservasAprov(data.reservas || []);
      } else {
        console.error("Erro ao carregar reservas aprovadas:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao carregar reservas aprovadas:", error);
    }
  };

  // Efeito para carregar as reservas e reservas aprovadas quando os filtros mudam
  useEffect(() => {
    loadReservas();
    loadReservasAprov();
  }, [filterSala, filterData, filterHora, filterNome]);

  // Atualiza as tabelas com as reservas
  const renderTableRows = (data: any[]) => {
    return data.map((reserva) => (
      <tr key={reserva.id}>
        <td>{reserva.id}</td>
        <td>{reserva.dataAgendamento}</td>
        <td>{reserva.horaAgendamento}</td>
        <td>{reserva.sala_nome}</td>
        <td>{reserva.usuario}</td>
      </tr>
    ));
  };


  return (
    <AdminSidebar>
      <AdminPopups
        idModal="AddModal"
        formLabel="Adicionar Reservas"
        show={show}
        handleClose={handleClose} 
        selectedUsuario={0}      
      />
      <div className="relative flex flex-col flex-auto">
        <div className="container mt-4">
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">
                  <h4>
                    Agendamentos pendentes
                  </h4>
                  <div className="flex items-center justify-start pt-2">
                    <label className="pr-1 !m-0 text-black">Sala alocada:</label>
                    <select className="text-black border border-black" id="filter_sala" name="filter_sala" onChange={(e) => setFilterSala(e.target.value)} value={filterSala} required>
                      <option value="">--Todas as salas--</option>
                      {/* Aqui você pode adicionar a lógica para carregar as salas */}
                    </select>
                    <div className="">
                      <label className="pl-2 pr-1 !m-0 text-black">Selecione a data:</label>
                      <input className="text-black border border-black" type="date" id="filter_data1" name="filter_data1" onChange={(e) => setFilterData(e.target.value)} value={filterData}/>
                    </div>
                    <div className="">
                      <label className="pl-2 pr-1 !m-0 text-black">Selecione a hora:</label>
                      <input className="text-black border border-black" type="time" id="filter_hora1" name="filter_hora1" onChange={(e) => setFilterHora(e.target.value)} value={filterHora}/>
                    </div>
                    <div className="">
                      <label className="pl-2 pr-1 !m-0 text-black">Nome do alocador:</label>
                      <input className="text-black border border-black" type="text" id="filter_nome" name="filter_nome" autoComplete="OFF" onChange={(e) => setFilterNome(e.target.value)} value={filterNome}/>
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
                  <h4 className="mb-4">Agendamentos aprovados
                    <button type="button" onClick={handleShow} className="btn btn-primary float-end">Adicionar agendamento</button>
                  </h4>
                  <div className="flex items-center justify-start pt-2">
                    <label className="pr-1 !m-0 text-black">Sala alocada:</label>
                    <select className="text-black border border-black" id="ffilter_sala_aloc" name="filter_sala_aloc" onChange={(e) => setFilterSala(e.target.value)} value={filterSala} required>
                      <option value="">--Todas as salas--</option>
                      {/* Aqui você pode adicionar a lógica para carregar as salas */}
                    </select>
                    <div className="">
                      <label className="pl-2 pr-1 !m-0 text-black">Data da reserva:</label>
                      <input className="text-black border border-black" type="date" id="filter_data2" name="filter_data2" onChange={(e) => setFilterData(e.target.value)} value={filterData}/>
                    </div>
                    <div className="">
                      <label className="pl-2 pr-1 !m-0 text-black">Hora da reserva:</label>
                      <input className="text-black border border-black" type="time" id="filter_hora2" name="filter_hora2" onChange={(e) => setFilterHora(e.target.value)} value={filterHora}/>
                    </div>
                    <div className="">
                      <label className="pl-2 pr-1 !m-0 text-black">Nome do alocador:</label>
                      <input className="text-black border border-black" type="text" id="filter_nome_aloc" name="filter_nome_aloc" autoComplete="OFF" onChange={(e) => setFilterNome(e.target.value)} value={filterNome}/>
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
      </div>
    </AdminSidebar>
  );
};