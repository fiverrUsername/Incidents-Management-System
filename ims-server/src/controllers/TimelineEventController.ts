import { ITimelineEvent } from "../interfaces/ItimelineEvent";
import { constants } from "../loggers/constants";
import timelineEvent, { TimelineEventSchema } from "../models/timelineEvent";
import express, { Request, Response } from 'express';
import timelineEventService from "../services/timelineEventService";
import logger from "../loggers/log";


export default class TimelineEventController {

    async getAllTimelineEvents(req: Request, res: Response): Promise<void> {
        try {
            const timelineEvents: ITimelineEvent[] | null = await timelineEventService.getAllTimelineEvents();
            if (timelineEvents instanceof Error) {
                res.status(404).json({ message: timelineEvent, error: true });
            }
            else res.status(200).json(timelineEvents);
        } catch (error: any) {
            res.status(500).json({ message: error });
        }
    }

    async addTimelineEvent(req: Request, res: Response): Promise<void> {
        try {
            const _timelineEvent = await timelineEventService.addTimelineEvent(req.body);
            if (_timelineEvent instanceof Error) {
                res.status(500).json({ message: _timelineEvent });
                console.log("from try")
            }
            else res.status(201).json(_timelineEvent);
            console.log("from try")
        } catch (error: any) {
            console.log("from catch")

            res.status(500).json({ message: error.message });
        }
    }

    async deleteTimelineEvent(req: Request, res: Response): Promise<void> {
        try {
            const _timelineEvent:ITimelineEvent|null = await timelineEventService.deleteTimelineEvent(req.params.id);
            if (_timelineEvent instanceof Error || _timelineEvent===null ) {
                res.status(404).send({ message: constants.NOT_FOUND, error: true })
            }
            else {
                res.status(200).send(_timelineEvent)
            }
        }
        catch (error: any) {
            res.status(500).send({ message: error, error: true })
        }
    }

}