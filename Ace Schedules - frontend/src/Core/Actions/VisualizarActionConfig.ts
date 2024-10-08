import axios from 'axios';

export type GetVisualizarActionOutput = {
    status: GetVisualizarActionStatus;
    data: any; // Alterado para 'any' para acomodar objeto ou mensagem de erro
}

export type GetVisualizarActionStatus = 'SUCCESS' | 'USER_NOT_FOUND' | 'UNKNOWN';

export class VisualizarActionConfig {
    static async execute(): Promise<GetVisualizarActionOutput> {
        try {
            const response = await axios.get(`/api/userAuth/Getconfig`, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const { success, message, usuario } = response.data; // Adicionando o usuario para acesso

            console.log("Resposta da API:", response.data);

            if (success) {
                console.log("Usuário obtido com sucesso:", usuario);
                return {
                    status: 'SUCCESS',
                    data: usuario // Passa o objeto do usuário
                };
            } else {
                console.log("Usuário não encontrado:", message);
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