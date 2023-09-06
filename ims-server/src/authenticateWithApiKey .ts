import { Request, Response, NextFunction } from 'express';
import { status } from './loggers/constants'

export const authenticateWithApiKey = () => {
    const apiKey = process.env.API_KEY;

    return (req: Request, res: Response, next: NextFunction) => {
        if (req.headers.authorization === `Bearer ${apiKey}`) {
            next();
        } else {
            res.status(status.BAD_REQUEST).json({ error: 'Unauthorized' });
        }
    };
};
