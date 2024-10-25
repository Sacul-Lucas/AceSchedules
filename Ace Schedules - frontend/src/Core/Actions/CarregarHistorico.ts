import axios from "axios";

export type Historyinput = {
    filterSalaAlocada: string;
    FilterDataInicio: string;
    FilterDataFim: string;
    status: boolean;
};

export type LoadHistoryOutput = {
    status: LoadHistoryStatus;
    data: {
        reservas: any[]; // Altere 'any' para o tipo específico das reservas, se souber
        total: number;
    };
};
export type LoadHistoryStatus = 'SUCCESS' | 'ERROR' | 'UNKNOWN';

export class LoadHistoryAction {
    static async execute(input: Historyinput): Promise<LoadHistoryOutput> {
        try {
            // Log dos dados recebidos
            console.log("Dados recebidos no input:", input);

            // Parâmetros que serão enviados na requisição
            const params = {
                status: input.status.toString(), // Converte o status para string
                sala: input.filterSalaAlocada,
                dataIN: input.FilterDataInicio,
                dataFN: input.FilterDataFim,
            };

            // Log dos dados que serão enviados na requisição
            console.log("Parâmetros enviados na requisição:", params);

            const response = await axios.get(`/api/userAuth/CarregarHistorico`, {
                params,
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const { success, reservas, total } = response.data;

            // Log da resposta recebida do backend
            console.log("Resposta do backend:", response.data);

            if (success) {
                return {
                    status: 'SUCCESS',
                    data: {
                        reservas: reservas || [],
                        total: total || 0,
                    },
                };
            } else {
                return {
                    status: 'ERROR',
                    data: {
                        reservas: [],
                        total: 0,
                    },
                };
            }
        } catch (error) {
            console.error("Erro ao carregar histórico:", error);

            return {
                status: 'UNKNOWN',
                data: {
                    reservas: [],
                    total: 0,
                },
            };
        }
    }
}