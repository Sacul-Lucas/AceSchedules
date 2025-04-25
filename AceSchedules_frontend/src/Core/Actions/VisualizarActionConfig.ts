import axios from 'axios';
import { API_BASE_URL } from '../../Config';

export type GetVisualizarActionOutput = {
    status: GetVisualizarActionStatus;
    data: any; // Alterado para 'any' para acomodar objeto ou mensagem de erro
}

export type GetVisualizarActionStatus = 'SUCCESS' | 'USER_NOT_FOUND' | 'UNKNOWN';

export class VisualizarActionConfig {
    static async execute(): Promise<GetVisualizarActionOutput> {
        try {
            const response = await axios.get(`${API_BASE_URL}/userAuth/Getconfig`, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const { success, message, usuario } = response.data; // Adicionando o usuario para acesso

            if (success) {
                return {
                    status: 'SUCCESS',
                    data: usuario // Passa o objeto do usuário
                };
            } else {
                return {
                    status: 'USER_NOT_FOUND',
                    data: message
                };
            }
        } catch (error) {
            console.error("Erro ao obter dados do usuário:", error);
            return {
                status: 'UNKNOWN',
                data: 'Erro de conexão'
            };
        }
    }
};