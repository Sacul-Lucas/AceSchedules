import axios from 'axios';

export type GetUsertypeActionOutput = {
    status: GetUsertypeActionStatus;
    data: string;
}

export type GetUsertypeActionStatus = 'SUCCESS' | 'USER_NOT_FOUND' | 'UNKNOWN';

export class GetUsertypeAction {
    static async execute(): Promise<GetUsertypeActionOutput> {
        try {
            const response = await axios.get('/api/userAuth/usertype', {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const { success, message } = response.data;

            if (success) {
                return {
                    status: 'SUCCESS',
                    data: response.data.usertype
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