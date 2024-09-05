import React, { useEffect, useState } from "react";
import $ from "jquery";
import { defineApp } from "../../Core/Components/Utils/DefineApp";
import { AdminPopups } from "../../Core/Components/Utils/AdminPopups";

// Definição de interfaces para as respostas JSON
interface Sala {
  id: number;
  nome: string;
}

interface ReservaData {
  id: number;
  dataAgendamento: string;
  horaAgendamento: string;
  sala_id: number;
  sala_nome?: string;
  locador_nome?: string;
  email?: string;
  telefone?: string;
  cnpj?: string;
}

interface ApiResponse {
  status: number;
  message?: string;
  data?: ReservaData;
  salas?: Sala[];
}

declare global {
  interface JQuery {
    modal(action: string): JQuery;
  }
}

// Função utilitária para conversão de string JSON em objeto
function parseJSON<T>(response: string): T | null {
  try {
    return JSON.parse(response);
  } catch (e) {
    console.error("Invalid JSON response", e);
    return null;
  }
}

export const Reservas: React.FC = () => {
  const [show, setShow] = useState(false);

  // Funções para abrir e fechar o modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    // Evento de clique para o botão de edição
    $(document).on("click", ".editBtn", function () {
      const id = $(this).data("id") as number;

      $.ajax({
        url: "code.php",
        type: "GET",
        data: { id: id },
        success: function (response: string) {
          const res = parseJSON<ApiResponse>(response);

          if (res && res.status === 200 && res.data) {
            $("#id").val(res.data.id);
            $("#data").val(res.data.dataAgendamento);
            $("#hora").val(res.data.horaAgendamento);

            const salas = res.salas ?? [];
            const salaAtual = res.data.sala_id;
            const select = $('select[name="sala"]');
            select.empty();

            salas.forEach((sala: Sala) => {
              const selected = sala.id === salaAtual ? "selected" : "";
              select.append(
                `<option value="${sala.id}" ${selected}>${sala.nome}</option>`
              );
            });

            $("#EditModal").modal("show"); // Mostrar o modal de edição
          } else {
            alert(res?.message ?? "Erro ao carregar os dados.");
          }
        },
        error: function (xhr, status, error) {
          console.error("AJAX Error: ", error);
        },
      });
    });

    // Evento de clique para o botão de visualização
    $(document).on("click", ".viewBtn", function () {
      const id = $(this).data("id") as number;

      $.ajax({
        url: "code.php",
        type: "GET",
        data: { id: id },
        success: function (response: string) {
          const res = parseJSON<ApiResponse>(response);

          if (res && res.status === 200 && res.data) {
            $("#view_nome").text(res.data.sala_nome || "");
            $("#view_data").text(res.data.dataAgendamento);
            $("#view_hora").text(res.data.horaAgendamento);
            $("#view_locador").text(res.data.locador_nome || "");
            $("#view_email").text(res.data.email || "");
            $("#view_contato").text(res.data.telefone || "");
            $("#view_cnpj").text(res.data.cnpj || "");
            $("#ViewModal").modal("show"); // Mostrar o modal de visualização
          } else {
            alert(res?.message ?? "Erro ao carregar os dados.");
          }
        },
        error: function (xhr, status, error) {
          console.error("AJAX Error: ", error);
        },
      });
    });

    // Cleanup dos eventos quando o componente é desmontado
    return () => {
      $(document).off("click", ".editBtn");
      $(document).off("click", ".viewBtn");
    };
  }, []);

  defineApp({
    cssPath: '',
    appTitle: 'Ace Schedules - Reservas',
    appIcon: 'src/assets/icons/user-circle-solid.svg'
})

  return (
    <div>
      {/* Usando o AdminPopups */}
      <AdminPopups
        idModal="AddModal"
        formLabel="Adicionar Reservas"
        show={show}
        handleClose={handleClose}
      />
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h4>Agendamentos pendentes
                  <a href="/Usuarios" className="btn btn-primary float-end">Administração de usuários</a>
                  <a href="/Salas" className="btn btn-primary float-end">Administração de salas</a>
                </h4>
                <div>
                  Selecione a sala:
                  <select id="filter_sala" name="filter_sala" required>
                    <option value="">--Todas as salas--</option>
                    {/* Aqui você pode adicionar a lógica para carregar as salas */}
                  </select>
                  <div className="form-group">
                    <label htmlFor="data">Selecione a data:</label>
                    <input type="date" id="filter_data" name="filter_data"/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="hora">Selecione a hora:</label>
                    <input type="time" id="filter_hora" name="filter_hora"/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="nome">Nome do alocador:</label>
                    <input type="text" id="filter_nome" name="filter_nome" autoComplete="OFF"/>
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
                    {/* <!-- Reservas são carregadas aqui --> */}
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
                <button type="button" onClick={handleShow} className="btn btn-primary float-end">Adicionar agendamento</button>
              </div>
              <div>
                Selecione a sala:
                <select id="sala_aprov" name="sala_aprov" required>
                  <option value="">--Todas as salas--</option>
                  {/* Aqui você pode adicionar a lógica para carregar as salas */}
                </select>
                <div className="form-group">
                  <label htmlFor="data_aprov">Selecione a data:</label>
                  <input type="date" id="data_aprov" name="data"/>
                </div>
                <div className="form-group">
                  <label htmlFor="hora_aprov">Selecione a hora:</label>
                  <input type="time" id="hora_aprov" name="hora"/>
                </div>
                <div className="form-group">
                  <label htmlFor="nome_aprov">Nome do alocador:</label>
                  <input type="text" id="nome_aprov" name="nome" autoComplete="OFF"/>
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
                    {/* <!-- Reservas são carregadas aqui --> */}
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

    

