import axios from "axios";

export type Usuarioinput = {
    filterNome: string;
    filterEmail: string;
    filterUserType: string;
};

export type LoadUserActionOutput = {
    status: LoadUserStatus;
    data: string;
};
export type LoadUserStatus = 'SUCCESS' | 'ERROR' | 'UNKNOWN';

export class LoadUserAction {
    static async execute(input: Usuarioinput): Promise<LoadUserActionOutput> {
        try {
            const response = await axios.get(`/api/adminPaths/Usuarios`, {
                params: {
                    filterNome: input.filterNome,
                    filterEmail: input.filterEmail,
                    filterUserType: input.filterUserType,
                },
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const { success, message } = response.data;

            if (success) {
                return {
                    status: 'SUCCESS',
                    data: message
                };
            } else {
                return {
                    status: 'ERROR',
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