import React, { FormEventHandler, useEffect, useState } from 'react';

// Interface para o tipo de sala
interface Sala {
  id: string;
  nome: string;
}

export interface Reserva {
  id: number; 
  data: string;
  hora: string;
  idSalaAlocada: number
  salaAlocada: string;
  locador: string;
  emailLocador: string;
  contatoLocador: string;
  cnpjLocador: string;
  status: boolean;
}

interface FormsReservaProps {
  selectvalue: string;
  selectedReserva: Reserva | null;
  formVER: boolean;
  formID: string;
  idSalaAlocada: string;
  idData: string;
  idHora: string;
  edit: boolean;
  salaAction?: FormEventHandler<HTMLLabelElement> | undefined | any;
}

export const FormsReserva: React.FC<FormsReservaProps> = ({
  selectvalue,
  selectedReserva,
  formVER,
  formID,
  idSalaAlocada,
  idData,
  idHora,
  salaAction,
}) => {
    console.log(selectvalue)

    const formatDate = (dateString: string) => {
        const [year, month, day] = dateString.split('-');
        return `${day}/${month}/${year}`;
    };

  // Estado para armazenar as salas
  const [salas, setSalas] = useState<Sala[]>([]);

  useEffect(() => {
    // Função para buscar as salas da API
    const fetchSalas = async () => {
      try {
        const response = await fetch('/api/adminPaths/Salas'); // Ajuste a rota da API conforme necessário
        const data = await response.json();

        // Verifica se data.salas é um array antes de definir o estado
        if (data && Array.isArray(data.salas)) {
          setSalas(data.salas);
        } else {
          console.error('Erro: Salas não são um array', data);
        }
      } catch (error) {
        console.error('Erro ao buscar as salas:', error);
      }
    };

    fetchSalas();
  }, []); // O array vazio faz com que o efeito seja executado apenas uma vez ao carregar o componente

  return (
    <div>
      {formVER === false ? (
        <div>
          <div className="modal-body">
            <div className="mb-3">
              <label>Nome da sala alocada</label>
              <p id="view_nome" className="form-control">{selectedReserva?.salaAlocada}</p>
            </div>
            <div className="mb-3">
            <label>Data da reserva</label>
            <p id="view_data" className="form-control">
                {selectedReserva ? formatDate(selectedReserva.data) : ''}
            </p>
            </div>
            <div className="mb-3">
              <label>Horário da reserva</label>
              <p id="view_hora" className="form-control">{selectedReserva?.hora}</p>
            </div>
            <div className="mb-3">
              <label>Locador da sala</label>
              <p id="view_locador" className="form-control">{selectedReserva?.locador}</p>
            </div>
            <div className="mb-3">
              <label>Email do locador</label>
              <p id="view_email" className="form-control">{selectedReserva?.emailLocador}</p>
            </div>
            <div className="mb-3">
              <label>Contato do locador</label>
              <p id="view_contato" className="form-control">{selectedReserva?.contatoLocador}</p>
            </div>
            <div className="mb-3">
              <label>CNPJ do locador</label>
              <p id="view_cnpj" className="form-control">{selectedReserva?.cnpjLocador}</p>
            </div>
          </div>
        </div>
      ) : (
        <form id={formID} method="POST">
          <div className="modal-body">
            <div className="mb-3">
            <label htmlFor={idSalaAlocada}>Sala Alocada</label>
            <select className="form-control" id={idSalaAlocada} onChange={salaAction} defaultValue={selectvalue}>
            {selectvalue ?  <option>{selectvalue}</option>: <option value="" disabled>Selecione uma sala</option>}
            {salas.map((sala) => (
                <option key={`${sala.id}-${sala.nome}`} value={sala.id}>
                {sala.nome}
                </option>
            ))}
            </select>
            
            </div>
            <div className="mb-3">
              <label>Data do agendamento</label>
              <input
                id={idData}
                type="date"
                name="data"
                className="form-control"
                defaultValue={selectedReserva?.data}
              />
            </div>
            <div className="mb-3">
              <label>Horário do agendamento</label>
              <input
                id={idHora}
                type="time"
                name="hora"
                className="form-control"
                defaultValue={selectedReserva?.hora}
              />
            </div>
          </div>
        </form>
      )}
    </div>
  );
};