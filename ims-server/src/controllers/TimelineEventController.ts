import { ITimelineEvent } from "../interfaces/ItimelineEvent";
import { constants } from "../loggers/constants";
import timelineEvent, { TimelineEventSchema } from "../models/timelineEvent";
import express, { Request, Response } from 'express';


export default class TimelineEventController {

    getAllTimelineEvents = async (req: Request, res: Response) => {
        try {
            const timelineEvents: ITimelineEvent[] | null = await timelineEvent.find();
            return res.status(200).json(timelineEvents);
        } catch (error: any) {
            return res.status(404).json({ message: error });
        }
    }

    getTimelineEventById = async (req: Request, res: Response) => {
        try {
            const _timelineEvent: ITimelineEvent | null = await timelineEvent.findById(req.params.id);
            return res.status(200).json(_timelineEvent);
        } catch (error: any) {
            return res.status(404).json({ message: error });
        }
    }

    addTimelineEvent = async (req: Request, res: Response) => {
        try {
            const _timelineEvent = await timelineEvent.create(req.body);
            return res.status(201).json(_timelineEvent);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    updateTimelineEvent = async (req: Request, res: Response) => {
        try {
            const _timelineEvent = await timelineEvent.findByIdAndUpdate(req.params.id, req.body);
            if (_timelineEvent) {
                return res.status(200).json(_timelineEvent);
            }
            else if (!req.params.userName) {
                return res.status(422).json({ message: constants.MISSNG_REQUIRED_FIELDS, error: true })
            }
            return res.status(404).json({ message: constants.METHOD.POST });
        } catch (error: any) {
            return res.status(500).json({ message: error.message, error: true });
        }
    }

    deleteTimelineEvent = async (req: Request, res: Response) => {
        try {
            const _timelineEvent = await timelineEvent.findByIdAndDelete(req.params.id);
            return res.status(200).send(_timelineEvent)
        }
        catch (error: any) {
            return res.status(500).send({ message: error, error: true })
        }
    }

}