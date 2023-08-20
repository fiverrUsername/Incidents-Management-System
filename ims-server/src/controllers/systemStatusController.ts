import { Request, Response } from "express";
import { status } from "../loggers/constants";
import systemStatusService from "../services/systemStatusService";
import { IIncident } from "../interfaces/IncidentInterface";
import { ISystemStatus } from "../interfaces/systemStatusInterface";
import { ITimelineEvent } from "../interfaces/ItimelineEvent";
export default class systemStatusController {
   async getLatestLiveStatus(req: Request, res: Response): Promise<void> {
        try {
            const systems = await systemStatusService.getLatestLiveStatus();
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
            const tag: string = req.body.systemName
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