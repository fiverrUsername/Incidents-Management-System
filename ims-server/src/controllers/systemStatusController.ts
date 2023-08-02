import { type Request, type Response } from "express";

import { status } from "../loggers/constants";
import systemStatusService from "../services/systemStatusService";
import { ISystemStatus } from "../interfaces/systemStatusInterface";

export default class systemStatusController {
    //think what i need to export...
    
    async getLatestLiveStatus(req: Request, res: Response): Promise<void> {
        try {
            const tag: string = req.query.tag as string;
            //const tag: string="inbox"
            const systems = await systemStatusService.getLatestLiveStatus(tag);
            if (systems instanceof Error) {
                res.status(status.SERVER_ERROR).json({ message: systems, error: true });
            } else res.status(status.SUCCESS).json(systems);
        } catch (error: any) {
            res.status(status.SERVER_ERROR).json({ message: error });
        }
    }
    //after test remove this
    async createLiveStatus(req: Request, res: Response): Promise<void> {
        try {
            const tag: string = "inbox"
            const data:ISystemStatus=req.body
            const systems = await systemStatusService.createLiveStatus(data,tag);
            if (systems instanceof Error) {
                res.status(status.SERVER_ERROR).json({ message: systems, error: true });
            } else res.status(status.SUCCESS).json(systems);
        } catch (error: any) {
            res.status(status.SERVER_ERROR).json({ message: error });
        }
    }
}

// export default new systemStatusController()