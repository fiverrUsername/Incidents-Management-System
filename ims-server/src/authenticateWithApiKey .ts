import { Request, Response, NextFunction } from 'express';
import { STATUS } from './loggers/constants'

export const authenticateWithApiKey = () => {
    const apiKey: string | undefined = process.env.API_KEY;

    return (req: Request, res: Response, next: NextFunction) => {
        if (req.headers.authorization === `Bearer ${apiKey}`) {
            next();
        } else {
            res.status(STATUS.BAD_REQUEST).json({ error: 'Unauthorized' });
        }
    };
};