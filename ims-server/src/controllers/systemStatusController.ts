import { Request, Response } from "express";

import { status } from "../loggers/constants";
import systemStatusService from "../services/systemStatusService";
import { IIncident } from "../interfaces/IncidentInterface";
import { ISystemStatus } from "../interfaces/systemStatusInterface";

export default class SystemStatusController {
    async getLiveStatusSystemsByDate(req: Request, res: Response): Promise<void> {
        try {
            const date: string = req.body
            const systems = await systemStatusService.getLiveStatusSystemsByDate(date);
            if (systems instanceof Error) {
                res.status(status.SERVER_ERROR).json({ message: systems, error: true });
            } else res.status(status.CREATED_SUCCESS).json(systems);
        } catch (error: any) {
            res.status(status.SERVER_ERROR).json({ message: error });
        }
    }
    async createLiveStatus(req: Request, res: Response): Promise<void> {
        try {
            const data: ISystemStatus = req.body
            const tag: string = req.params.tag
            const liveStatus = await systemStatusService.createLiveStatus(data, tag)
            if (liveStatus instanceof Error) {
                res.status(status.SERVER_ERROR).json({ message: liveStatus, error: true });
            } else res.status(status.CREATED_SUCCESS).json(liveStatus);
        } catch (error: any) {
            res.status(status.SERVER_ERROR).json({ message: error });
        }
    }
    async updateLiveStatus(req: Request, res: Response): Promise<void> {
        try {
            const incident: IIncident = req.body;
            const id = req.params.id;
            const liveStatus = await systemStatusService.updateLiveStatus(
                incident,
                id
            );
            if (liveStatus instanceof Error) {
                res
                    .status(status.SERVER_ERROR)
                    .json({ message: liveStatus, error: true });
            } else res.status(status.CREATED_SUCCESS).json(liveStatus);
        } catch (error: any) {
            res.status(status.SERVER_ERROR).json({ message: error });
        }
    }
}
// export default new SystemStatusController();
