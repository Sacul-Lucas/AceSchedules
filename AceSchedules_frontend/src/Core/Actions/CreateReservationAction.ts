import axios from "axios";
import { API_BASE_URL } from "../../Config";

export type CreateReservationActionInput = {
    dataAgendamentoInicial: string
    dataAgendamentoFinal: string
    salaAlocada: number
}

export type CreateReservationActionOutput = {
	status: RegisterUserStatus;
    data: string
}

export type RegisterUserStatus = 'SUCCESS' | 'RESERVATION_ALREADY_EXISTS' | 'INVALID_VALUES' | 'UNKNOWN';

export class CreateReservationAction {
    static async execute(input: CreateReservationActionInput): Promise<CreateReservationActionOutput> {
        try {
            const response = await axios.post(`${API_BASE_URL}/adminPaths/Reservas/Criar`, {
                dataAgendamentoInicial: input.dataAgendamentoInicial,
                dataAgendamentoFinal: input.dataAgendamentoFinal,
                salaAlocada: input.salaAlocada
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            })
            const { success, message } = response.data;
    
            if (success) {
                return {
                    status: 'SUCCESS',
                    data: response.data.message
                };
            } else if (!input.dataAgendamentoInicial || !input.dataAgendamentoFinal || new Date(input.dataAgendamentoInicial) >= new Date(input.dataAgendamentoFinal) || !input.salaAlocada) {
                return {
                    status: 'INVALID_VALUES',
                    data: response.data.message
                };
            } else {
                return {
                    status: 'RESERVATION_ALREADY_EXISTS',
                    data: message
                };
            }
        } catch (error) {
            return {
                status: 'UNKNOWN',
                data: 'Erro de conexão'
            };
        }
    }
}