import { Request, Response } from 'express';

export const Logout = (req: Request, res: Response) => {
    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Erro ao encerrar a sessão' });
            }
            return res.json({ success: true, message: 'Logout realizado com sucesso!' });
        });
    } else {
        return res.json({ success: false, message: 'Nenhuma sessão ativa' });
    }
};