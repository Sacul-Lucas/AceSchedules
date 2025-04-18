import axios from "axios";

export type UserLogoutActionOutput = {
    status: UserLogoutActionStatus;
    data: string;
}

export type UserLogoutActionStatus = 'SUCCESS' | 'UNKNOWN';

export class UserLogoutAction {
    static async execute(): Promise<UserLogoutActionOutput> {
        try {
            const response = await axios.post('/api/userAuth/logout', {}, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
    
            const { success, message } = response.data;
    
            if (success) {
                return {
                    status: 'SUCCESS',
                    data: message
                };
            } else {
                return {
                    status: 'UNKNOWN',
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