import { type Request, type Response } from "express";

import { status } from "../loggers/constants";
import systemStatusService from "../services/systemStatusService";

class systemStatusController {
    async getSystemsByDate(req: Request, res: Response): Promise<void> {
        try {
            const date: string = req.body
            const systems = await systemStatusService.getSystemsByDate(date);
            if (systems instanceof Error) {
                res.status(status.SERVER_ERROR).json({ message: systems, error: true });
            } else res.status(status.CREATED_SUCCESS).json(systems);
        } catch (error: any) {
            res.status(status.SERVER_ERROR).json({ message: error });
        }
    }
}

export default new systemStatusController()