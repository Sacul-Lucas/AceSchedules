import axios from "axios";

export type AuthUserActionInput = {
	email: string;
	senha: string;
    usertype: string;
}

export type AuthUserActionOutput = {
	status: AuthUserStatus;
    data: string
}

export type AuthUserStatus = 'SUCCESS' | 'EMAIL_NOT_FOUND' | 'UNKNOWN';

export class AuthUserAction {
    static async execute(input: AuthUserActionInput): Promise<AuthUserActionOutput> {
        try {
            const response = await axios.post('/api/userAuth/login', {
                email: input.email,
                senha: input.senha,
                usertype: input.usertype
            }, {
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
                    status: 'EMAIL_NOT_FOUND',
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