import axios from "axios";

export type Historyinput = {
    filterSalaAlocada: string;
    FilterDataInicio: string;
    FilterDataFim: string;
};

export type LoadHistoryOutput = {
    status: LoadUserStatus;
    data: string;
};
export type LoadUserStatus = 'SUCCESS' | 'ERROR' | 'UNKNOWN';

export class LoadUserAction {
    static async execute(input: Historyinput): Promise<LoadHistoryOutput> {
        try {
            const response = await axios.get(`/api/userAuth/CarregarHistorico`, {
                params: {
                    filterSalaAlocada: input.filterSalaAlocada,
                    FilterDataInicio: input.FilterDataInicio,
                    FilterDataFim: input.FilterDataFim,
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