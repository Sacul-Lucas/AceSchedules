import axios from "axios";

export type CreateReservationActionInput = {
    dataAgendamentoInicial: string
    dataAgendamentoFinal: string
    salaAlocada: number
}

export type CreateReservationActionOutput = {
	status: RegisterUserStatus;
    data: string
}

export type RegisterUserStatus = 'SUCCESS' | 'RESERVATION_ALREADY_EXISTS' | 'UNKNOWN';

export class CreateReservationAction {
    static async execute(input: CreateReservationActionInput): Promise<CreateReservationActionOutput> {
        try {
            const response = await axios.post('/api/adminPaths/Reservas/Criar', {
                dataAgendamentoInicial: input.dataAgendamentoInicial,
                dataAgendamentoFinal: input.dataAgendamentoFinal,
                salaAlocada: input.salaAlocada
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            const { success, message } = response.data;
    
            if (success) {
                return {
                    status: 'SUCCESS',
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