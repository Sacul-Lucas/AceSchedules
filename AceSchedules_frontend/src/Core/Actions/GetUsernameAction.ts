import axios from 'axios';

export type GetUsernameActionOutput = {
    status: GetUsernameActionStatus;
    data: string;
}

export type GetUsernameActionStatus = 'SUCCESS' | 'USER_NOT_FOUND' | 'UNKNOWN';

export class GetUsernameAction {
    static async execute(): Promise<GetUsernameActionOutput> {
        try {
            const response = await axios.get('/api/userAuth/username', {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const { success, message } = response.data;
    
            if (success) {
                return {
                    status: 'SUCCESS',
                    data: response.data.usuario
                };
            } else {
                return {
                    status: 'USER_NOT_FOUND',
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
};