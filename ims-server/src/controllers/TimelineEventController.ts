import { Request, Response } from "express";
import { ITimelineEvent } from "../interfaces/ItimelineEvent";
import { constants } from "../loggers/constants";
import timelineEventService from "../services/timelineEventService";

export default class TimelineEventController {

    async getAllTimelineEvents(req: Request, res: Response): Promise<void> {
        try {
            const timelineEvents: ITimelineEvent[] | null = await timelineEventService.getAllTimelineEvents();
            if (timelineEvents instanceof Error) {
                res.status(404).json({ message: timelineEvents, error: true });
            }
            else res.status(200).json(timelineEvents);
        }
        catch (error: any) {
            res.status(500).json({ message: error });
        }
    }


    async getTimelineEventsById(req: Request, res: Response): Promise<void> {
        try {
            const timelineEvents: ITimelineEvent[] | null = await timelineEventService.getTimelineEventsById(req.params.id);
            if (timelineEvents instanceof Error) {
                res.status(404).json({ message: timelineEvents, error: true });
            }
            else res.status(200).json(timelineEvents);
        }
        catch (error: any) {
            res.status(500).json({ message: error });
        }
    }

    async addTimelineEvent(req: Request, res: Response): Promise<Response> {
        try {
            const _timelineEvent = await timelineEventService.addTimelineEvent(req.body);
            console.log(_timelineEvent)
            if (_timelineEvent instanceof Error) {
                return res.status(500).json({ message: _timelineEvent });
            }
            return res.status(201).json(_timelineEvent);
        }
        catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    async deleteTimelineEvent(req: Request, res: Response): Promise<void> {
        try {
            const _timelineEvent: ITimelineEvent | null = await timelineEventService.deleteTimelineEvent(req.params.id);
            if (_timelineEvent instanceof Error || _timelineEvent === null) {
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

    async updateTimelineEvent(req: Request, res: Response): Promise<void> {
        try {
            const _timelineEvent = await timelineEventService.updateTimelineEvent(req.params.id, req.body);
            if (_timelineEvent instanceof Error) {
                if (_timelineEvent.message === constants.MISSNG_REQUIRED_FIELDS) {
                    res.status(422).json({ message: constants.MISSNG_REQUIRED_FIELDS, error: true });
                } else if (_timelineEvent.message === constants.NOT_FOUND) {
                    res.status(404).json({ message: constants.NOT_FOUND });
                } else {
                    res.status(500).json({ message: _timelineEvent, error: true });
                }
            }
            else {
                res.status(200).json(_timelineEvent);
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message, error: true });
        }
    }

    async getTimelineEventById(req: Request, res: Response): Promise<void> {
        try {
            const _timelineEvent: ITimelineEvent | null = await timelineEventService.getTimelineEventById(req.params.id);
            if (_timelineEvent instanceof Error || _timelineEvent === null) {
                res.status(404).json({ message: constants.NOT_FOUND, error: true });
            }
            else res.status(200).json(_timelineEvent);
        } catch (error: any) {
            res.status(500).json({ message: error });
        }
    }

    async getFileInTimelineEventByIndex(req: Request, res: Response): Promise<Response> {
        try {
            const timelineEvent: ITimelineEvent | null = await timelineEventService.getTimelineEventById(req.params.id);
            const index: number | null = parseInt(req.query.index as string);
            if (timelineEvent instanceof Error || timelineEvent === null) {
                return res.status(404).json({ message: constants.NOT_FOUND, timelineEventId: req.params.id });
            }
            const files: string[] = timelineEvent.files;
            if (!(typeof index === 'number' && !isNaN(index)) || files.length === 0 || index < 0 || index >= files.length) {
                return res.status(400).json({ message: constants.BAD_REQUEST, error: constants.INDEX_NOT_VALID });
            }
            return res.status(200).json(files[index])
        } catch (error: any) {
            return res.status(500).json({ message: error });
        }
    }

    async deleteFileInTimelineEventByIndex(req: Request, res: Response): Promise<Response> {
        try {
            const timelineEvent: ITimelineEvent | null = await timelineEventService.getTimelineEventById(req.params.id);
            const index: number | null = parseInt(req.query.index as string);
            if (timelineEvent instanceof Error || timelineEvent === null) {
                return res.status(404).json({ message: constants.NOT_FOUND, timelineEventId: req.params.id });
            }
            const files: string[] = timelineEvent.files;
            if (!(typeof index === 'number' && !isNaN(index)) || files.length === 0 || index < 0 || index >= files.length) {
                return res.status(400).json({ message: constants.BAD_REQUEST, error: constants.INDEX_NOT_VALID });
            }
            timelineEvent.files.splice(index, 1);
            const updateTimelineEvent: ITimelineEvent | null = await timelineEventService.updateTimelineEvent(req.params.id, timelineEvent)
            if (updateTimelineEvent instanceof Error) {
                return res.status(500).json({ message: updateTimelineEvent, error: true });
            }
            return res.status(200).json(timelineEvent);
        } catch (error: any) {
            return res.status(500).json({ message: error });
        }
    }
}