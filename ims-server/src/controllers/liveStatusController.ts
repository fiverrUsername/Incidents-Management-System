import { Request, Response } from "express";

import { status } from "../loggers/constants";
import liveStatusService from "../services/liveStatusService";
import { IliveStatus } from "../interfaces/liveStatusInterface";
import { ITimelineEvent } from "../interfaces/ItimelineEvent";

export default class liveStatusController {
  
   async getLiveStatus(req: Request, res: Response): Promise<void> {
        try {
            console.log("i'm hereeeeeeee")
            let systems: IliveStatus[] | any;
            if(req.params.date){
                const filterDate: Date = new Date(req.params.date);
                console.log("filterDate",filterDate)
                 systems = await liveStatusService.getLiveStatus(filterDate);
            }
            else{
                systems = await liveStatusService.getLiveStatus();
            }
            
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
            const data:IliveStatus=req.body
            const systems = await liveStatusService.createOrUpdateLiveStatus(data,'',tag);
            if (systems instanceof Error) {
                res.status(status.SERVER_ERROR).json({ message: systems, error: true });
            } else res.status(status.SUCCESS).json(systems);
        } catch (error: any) {
            res.status(status.SERVER_ERROR).json({ message: error });
        }
    }
}
