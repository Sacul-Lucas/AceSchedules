import axios from "axios";

export type CreateReservationActionInput = {
    startDate: Date | null
    endDate: Date | null
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
                startDate: input.startDate,
                endDate: input.endDate,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            const { success, message } = response.data;
    
            if (success) {
                return {
                    status: 'SUCCESS',
                    data: message
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