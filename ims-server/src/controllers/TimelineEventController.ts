import { Request, Response } from "express";
import { ITimelineEvent } from "../interfaces/ItimelineEvent";
import { constants, status } from "../loggers/constants";
import timelineEventService from "../services/timelineEventService";

export default class TimelineEventController {

    async getAllTimelineEvents(req: Request, res: Response): Promise<void> {
        try {
            const timelineEvents: ITimelineEvent[] | null = await timelineEventService.getAllTimelineEvents();
            if (timelineEvents instanceof Error) {
                res.status(status.PAGE_NOT_FOUND).json({ message: timelineEvents, error: true });
            }
            else res.status(status.SUCCESS).json(timelineEvents);
        }
        catch (error: any) {
            res.status(status.MISSNG_REQUIRED_FIELDS).json({ message: error });
        }
    }


    async getTimelineEventsById(req: Request, res: Response): Promise<void> {
        try {
            const timelineEvents: ITimelineEvent[] | null = await timelineEventService.getTimelineEventsById(req.params.id);
            if (timelineEvents instanceof Error) {
                res.status(status.PAGE_NOT_FOUND).json({ message: timelineEvents, error: true });
            }
            else res.status(status.SUCCESS).json(timelineEvents);
        }
        catch (error: any) {
            res.status(status.MISSNG_REQUIRED_FIELDS).json({ message: error });
        }
    }

    async addTimelineEvent(req: Request, res: Response): Promise<Response> {
        try {
            const _timelineEvent = await timelineEventService.addTimelineEvent(req.body);
            console.log(_timelineEvent)
            if (_timelineEvent instanceof Error) {
                return res.status(status.MISSNG_REQUIRED_FIELDS).json({ message: _timelineEvent });
            }
            return res.status(status.CREATED_SUCCESS).json(_timelineEvent);
        }
        catch (error: any) {
            return res.status(status.MISSNG_REQUIRED_FIELDS).json({ message: error.message });
        }
    }

    async deleteTimelineEvent(req: Request, res: Response): Promise<void> {
        try {
            const _timelineEvent: ITimelineEvent | null = await timelineEventService.deleteTimelineEvent(req.params.id);
            if (_timelineEvent instanceof Error || _timelineEvent === null) {
                res.status(status.PAGE_NOT_FOUND).send({ message: constants.NOT_FOUND, error: true })
            }
            else {
                res.status(status.SUCCESS).send(_timelineEvent)
            }
        }
        catch (error: any) {
            res.status(status.MISSNG_REQUIRED_FIELDS).send({ message: error, error: true })
        }
    }

    async updateTimelineEvent(req: Request, res: Response): Promise<void> {
        try {
            const _timelineEvent = await timelineEventService.updateTimelineEvent(req.params.id, req.body);
            if (_timelineEvent instanceof Error) {
                if (_timelineEvent.message === constants.MISSNG_REQUIRED_FIELDS) {
                    res.status(status.MISSNG_REQUIRED_FIELDS).json({ message: constants.MISSNG_REQUIRED_FIELDS, error: true });
                } else if (_timelineEvent.message === constants.NOT_FOUND) {
                    res.status(status.PAGE_NOT_FOUND).json({ message: constants.NOT_FOUND });
                } else {
                    res.status(status.MISSNG_REQUIRED_FIELDS).json({ message: _timelineEvent, error: true });
                }
            }
            else {
                res.status(status.SUCCESS).json(_timelineEvent);
            }
        } catch (error: any) {
            res.status(status.MISSNG_REQUIRED_FIELDS).json({ message: error.message, error: true });
        }
    }

    async getTimelineEventById(req: Request, res: Response): Promise<void> {
        try {
            const _timelineEvent: ITimelineEvent | null = await timelineEventService.getTimelineEventById(req.params.id);
            if (_timelineEvent instanceof Error || _timelineEvent === null) {
                res.status(status.PAGE_NOT_FOUND).json({ message: constants.NOT_FOUND, error: true });
            }
            else res.status(status.SUCCESS).json(_timelineEvent);
        } catch (error: any) {
            res.status(status.MISSNG_REQUIRED_FIELDS).json({ message: error });
        }
    }

    async getFileInTimelineEventByIndex(req: Request, res: Response): Promise<Response> {
        try {
            const timelineEvent: ITimelineEvent | null = await timelineEventService.getTimelineEventById(req.params.id);
            const index: number | null = parseInt(req.query.index as string);
            if (timelineEvent instanceof Error || timelineEvent === null) {
                return res.status(status.PAGE_NOT_FOUND).json({ message: constants.NOT_FOUND, timelineEventId: req.params.id });
            }
            const files: string[] = timelineEvent.files;
            if (!(typeof index === 'number' && !isNaN(index)) || files.length === 0 || index < 0 || index >= files.length) {
                return res.status(status.BAD_REQUEST).json({ message: constants.BAD_REQUEST, error: constants.INDEX_NOT_VALID });
            }
            return res.status(status.SUCCESS).json(files[index])
        } catch (error: any) {
            return res.status(status.MISSNG_REQUIRED_FIELDS).json({ message: error });
        }
    }

    async deleteFileInTimelineEventByIndex(req: Request, res: Response): Promise<Response> {
        try {
            const timelineEvent: ITimelineEvent | null = await timelineEventService.getTimelineEventById(req.params.id);
            const index: number | null = parseInt(req.query.index as string);
            if (timelineEvent instanceof Error || timelineEvent === null) {
                return res.status(status.PAGE_NOT_FOUND).json({ message: constants.NOT_FOUND, timelineEventId: req.params.id });
            }
            const files: string[] = timelineEvent.files;
            if (!(typeof index === 'number' && !isNaN(index)) || files.length === 0 || index < 0 || index >= files.length) {
                return res.status(status.BAD_REQUEST).json({ message: constants.BAD_REQUEST, error: constants.INDEX_NOT_VALID });
            }
            timelineEvent.files.splice(index, 1);
            const updateTimelineEvent: ITimelineEvent | null = await timelineEventService.updateTimelineEvent(req.params.id, timelineEvent)
            if (updateTimelineEvent instanceof Error) {
                return res.status(status.MISSNG_REQUIRED_FIELDS).json({ message: updateTimelineEvent, error: true });
            }
            return res.status(status.SUCCESS).json(timelineEvent);
        } catch (error: any) {
            return res.status(status.MISSNG_REQUIRED_FIELDS).json({ message: error });
        }
    }
}