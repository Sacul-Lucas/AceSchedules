import axios from "axios";

export type RegisterUserActionInput = {
    usuario: string
    telefone: string
    cnpj: string
    email: string
    senha: string
    usertype: string
}

export type RegisterUserActionOutput = {
	status: RegisterUserStatus;
    data: string
}

export type RegisterUserStatus = 'SUCCESS' | 'EMAIL_ALREADY_EXISTS' | 'UNKNOWN';

export class RegisterUserAction {
    static async execute(input: RegisterUserActionInput): Promise<RegisterUserActionOutput> {
        try {
            const response = await axios.post('/api/userAuth/cadastro', {
                usuario: input.usuario,
                telefone: input.telefone,
                cnpj: input.cnpj,
                email: input.email,
                senha: input.senha,
                usertype: input.usertype
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
                    status: 'EMAIL_ALREADY_EXISTS',
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