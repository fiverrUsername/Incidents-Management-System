import { Request, Response } from "express";

import { status } from "../loggers/constants";
import liveStatusService from "../services/liveStatusService";
import { IliveStatus } from "../interfaces/liveStatusInterface";
import { ITimelineEvent } from "../interfaces/ItimelineEvent";

export default class liveStatusController {

    async getLiveStatus(req: Request, res: Response): Promise<void> {
        try {
            let systems: IliveStatus[] | null;
            if (req.query.date) {
                const filterDate = new Date(req.query.date.toString());
                //focus on a specific day without considering the time component.
                filterDate.setHours(0, 0, 0, 0);
                //if calling this action not from client
                if (isNaN(filterDate.getTime())) {
                    console.log("Invalid date format:", filterDate);
                    return;
                } else {
                    systems = await liveStatusService.getLiveStatus(filterDate);
                }
            }
            else {
                systems = await liveStatusService.getLiveStatus();
            }
            if (systems instanceof Error) {
                res.status(status.SERVER_ERROR).json({ message: systems, error: true });
            } else res.status(status.SUCCESS).json(systems);
        } catch (error: any) {
            res.status(status.SERVER_ERROR).json({ message: error });
        }
    }
}
