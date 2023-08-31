import { Request, Response } from "express";

import { status } from "../loggers/constants";
import liveStatusService from "../services/liveStatusService";
import { IliveStatus } from "../interfaces/liveStatusInterface";
import { ITimelineEvent } from "../interfaces/ItimelineEvent";

export default class liveStatusController {

    async getLiveStatus(req: Request, res: Response): Promise<Response> {
        try {
            let systems: IliveStatus[] | any;
            if (req.query.date) {
                const filterDate = new Date(req.query.date.toString());
                filterDate.setHours(0, 0, 0, 0);
                systems = await liveStatusService.getLiveStatus(filterDate);
            }
            else {
                systems = await liveStatusService.getLiveStatus();
            }
            if (!systems || systems instanceof Error) {
                return res.status(status.SERVER_ERROR).json({ message: systems, error: true });
            } return res.status(status.SUCCESS).json(systems);
        } catch (error: any) {
            return res.status(status.SERVER_ERROR).json({ message: error });
        }
    }
    //after test remove this
    async createLiveStatus(req: Request, res: Response): Promise<Response> {
        try {
            const tag: string = "inbox"
            const data: IliveStatus = req.body
            const systems = await liveStatusService.createOrUpdateLiveStatus(data, '', tag);
            if (!systems || systems instanceof Error) {
                return res.status(status.SERVER_ERROR).json({ message: systems, error: true });
            } return res.status(status.SUCCESS).json(systems);
        } catch (error: any) {
            return res.status(status.SERVER_ERROR).json({ message: error });
        }
    }
}
