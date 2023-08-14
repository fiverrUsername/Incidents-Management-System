import { Request, Response } from "express";

import { status } from "../loggers/constants";
import systemStatusService from "../services/systemStatusService";
import { ISystemStatus } from "../interfaces/systemStatusInterface";

export default class systemStatusController {
  
   async getLiveStatus(req: Request, res: Response): Promise<void> {
        try {
            const systems = await systemStatusService.getLiveStatus();
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
            const tag: string = "checkout"
            const data:ISystemStatus=req.body
            const systems = await systemStatusService.createOrUpdateLiveStatus(data,tag);
            if (systems instanceof Error) {
                res.status(status.SERVER_ERROR).json({ message: systems, error: true });
            } else res.status(status.SUCCESS).json(systems);
        } catch (error: any) {
            res.status(status.SERVER_ERROR).json({ message: error });
        }
    }
}
