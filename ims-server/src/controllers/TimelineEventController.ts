import { Request, Response } from "express";
import { ActionType, ObjectType } from '../../../ims-socket/src/interfaces';
import { ITimelineEvent } from "../interfaces/ItimelineEvent";
import { CONSTANTS, STATUS } from "../loggers/constants";
import logger from "../loggers/log";
import attachmentService from "../services/attachmentService";
import { sendToSocket } from '../services/socket';
import timelineEventService from "../services/timelineEventService";
import { KeyUrlPair } from "../interfaces/IAttachment";

export default class TimelineEventController {

    async getAllTimelineEvents(req: Request, res: Response): Promise<void> {
        try {
            const timelineEvents: ITimelineEvent[] | null = await timelineEventService.getAllTimelineEvents();
            if (timelineEvents instanceof Error) {
                res.status(STATUS.PAGE_NOT_FOUND).json({ message: timelineEvents, error: true });
            }
            else res.status(STATUS.SUCCESS).json(timelineEvents);
        }
        catch (error: any) {
            res.status(STATUS.MISSNG_REQUIRED_FIELDS).json({ message: error });
        }
    }

    async getTimelineEventByIncidentId(req: Request, res: Response): Promise<void> {
        try {
            const timelineEvents: ITimelineEvent[] | null = await timelineEventService.getTimelineEventByIncidentId(req.params.id);

            if (timelineEvents instanceof Error) {
                res.status(STATUS.PAGE_NOT_FOUND).json({ message: timelineEvents, error: true });
            }
            else res.status(STATUS.SUCCESS).json(timelineEvents);
        }
        catch (error: any) {
            res.status(STATUS.MISSNG_REQUIRED_FIELDS).json({ message: error });
        }
    }

    async addTimelineEvent(req: Request, res: Response): Promise<Response> {
        try {
            console.log("----------TimelineEventController: req.body:   ", req.body)
            const _timelineEvent: any = await timelineEventService.addTimelineEvent(req.body);
            if (_timelineEvent instanceof Error) {
                if (_timelineEvent.message === "Validation error" || _timelineEvent.message === "Incident ID not found") {
                    return res.status(STATUS.BAD_REQUEST).json({ message: CONSTANTS.INVALID_MESSAGE })
                }
                return res.status(STATUS.SERVER_ERROR).json({ message: CONSTANTS.SERVER_ERROR });
            }
            sendToSocket(req.body as ITimelineEvent, ObjectType.TimelineEvent, ActionType.Add);
            await timelineEventService.updateFieldsOfIncidentById(_timelineEvent);
            return res.status(STATUS.CREATED_SUCCESS).json(_timelineEvent);
        }
        catch (error: any) {
            return res.status(STATUS.SERVER_ERROR).json({ message: error.message });
        }
    }

    async deleteTimelineEvent(req: Request, res: Response): Promise<void> {
        try {
            const _timelineEvent: ITimelineEvent | null = await timelineEventService.deleteTimelineEvent(req.params.id);
            if (_timelineEvent instanceof Error || _timelineEvent === null) {
                res.status(STATUS.PAGE_NOT_FOUND).send({ message: CONSTANTS.NOT_FOUND, error: true })
            }
            else {
                res.status(STATUS.SUCCESS).send(_timelineEvent)
            }
        }
        catch (error: any) {
            res.status(STATUS.MISSNG_REQUIRED_FIELDS).send({ message: error, error: true })
        }
    }

    async updateTimelineEvent(req: Request, res: Response): Promise<void> {
        try {
            const _timelineEvent = await timelineEventService.updateTimelineEvent(req.params.id, req.body);
            if (_timelineEvent instanceof Error) {
                if (_timelineEvent.message === CONSTANTS.MISSNG_REQUIRED_FIELDS) {
                    res.status(STATUS.MISSNG_REQUIRED_FIELDS).json({ message: CONSTANTS.MISSNG_REQUIRED_FIELDS, error: true });
                } else if (_timelineEvent.message === CONSTANTS.NOT_FOUND) {
                    res.status(STATUS.PAGE_NOT_FOUND).json({ message: CONSTANTS.NOT_FOUND });
                } else {
                    res.status(STATUS.MISSNG_REQUIRED_FIELDS).json({ message: _timelineEvent, error: true });
                }
            }
            else {
                res.status(STATUS.SUCCESS).json(_timelineEvent);
            }
        } catch (error: any) {
            res.status(STATUS.MISSNG_REQUIRED_FIELDS).json({ message: error.message, error: true });
        }
    }

    async getTimelineEventById(req: Request, res: Response): Promise<void> {
        try {
            const _timelineEvent: ITimelineEvent | null = await timelineEventService.getTimelineEventById(req.params.id);
            if (_timelineEvent instanceof Error || _timelineEvent === null) {
                res.status(STATUS.PAGE_NOT_FOUND).json({ message: CONSTANTS.NOT_FOUND, error: true });
            }
            else res.status(STATUS.SUCCESS).json(_timelineEvent);
        } catch (error: any) {
            res.status(STATUS.MISSNG_REQUIRED_FIELDS).json({ message: error });
        }
    }

    async getFileInTimelineEventByIndex(req: Request, res: Response): Promise<Response> {
        try {
            const timelineEventId: string = req.params.id;
            const index: number = parseInt(req.query.index as string);
            const file = await timelineEventService.getFileInTimelineEventByIndex(timelineEventId, index);
            if (file instanceof Error) {
                if (file.message == 'Timeline event not found') {
                    return res.status(STATUS.PAGE_NOT_FOUND).json({ message: CONSTANTS.NOT_FOUND, timelineEventId: req.params.id });
                }
                if (file.message == 'Invalid index') {
                    return res.status(STATUS.BAD_REQUEST).json({ message: CONSTANTS.BAD_REQUEST, error: CONSTANTS.INDEX_NOT_VALID });
                }
                return res.status(500).json({ message: CONSTANTS.SERVER_ERROR });
            }
            logger.info({ source: CONSTANTS.TIMELINE_EVENT, msg: CONSTANTS.SUCCESS, timelineEventId, indexFile: index, method: CONSTANTS.METHOD.GET });
            return res.status(STATUS.SUCCESS).json(file);
        } catch (error: any) {
            return res.status(500).json({ message: error });
        }
    }

    async deleteFileInTimelineEventByIndex(req: Request, res: Response): Promise<Response> {
        try {
            const timelineEventId: string = req.params.id;
            const index: number = parseInt(req.query.index as string);
            const updatedTimelineEvent = await timelineEventService.deleteFileInTimelineEventByIndex(timelineEventId, index);
            if (updatedTimelineEvent instanceof Error) {
                if (updatedTimelineEvent.message == 'Timeline event not found') {
                    return res.status(STATUS.PAGE_NOT_FOUND).json({ message: CONSTANTS.NOT_FOUND, timelineEventId: req.params.id });
                }
                if (updatedTimelineEvent.message == 'Invalid index') {
                    return res.status(STATUS.BAD_REQUEST).json({ message: CONSTANTS.BAD_REQUEST, error: CONSTANTS.INDEX_NOT_VALID });
                }
                else {
                    return res.status(STATUS.MISSNG_REQUIRED_FIELDS).json({ message: CONSTANTS.SERVER_ERROR });
                }
            }
            logger.info({ source: CONSTANTS.TIMELINE_EVENT, msg: CONSTANTS.SUCCESS, timelineEventId, indexFile: index, method: CONSTANTS.METHOD.DELETE });
            return res.status(STATUS.SUCCESS).json(updatedTimelineEvent);
        } catch (error: any) {
            return res.status(500).json({ message: error });
        }
    }

    async deleteFileInTimelineEventByValue(req: Request, res: Response): Promise<Response> {
        try {
            const timelineEventId: string = req.params.id;
            const file: string | any = req.query.key;
            const updatedTimelineEvent = await timelineEventService.deleteFileInTimelineEventByValue(timelineEventId, file);
            if (updatedTimelineEvent instanceof Error) {
                if (updatedTimelineEvent.message == 'Timeline event not found' || updatedTimelineEvent.message === 'string file not exist') {
                    return res.status(STATUS.PAGE_NOT_FOUND).json({ message: CONSTANTS.NOT_FOUND, timelineEventId: req.params.id, stringFile: req.query.fileString });
                }
                return res.status(STATUS.SERVER_ERROR).json({ message: CONSTANTS.SERVER_ERROR });
            }
            logger.info({ source: CONSTANTS.TIMELINE_EVENT, msg: CONSTANTS.SUCCESS, timelineEventId, file: file, method: CONSTANTS.METHOD.DELETE });
            return res.status(STATUS.SUCCESS).json(updatedTimelineEvent);
        } catch (error: any) {
            return res.status(500).json({ message: error });
        }
    }

    async compareIncidentChanges(req: Request, res: Response): Promise<void> {
        interface compare {
            description: string[];
            files: any;
        }
        let answer: compare = { description: ["", "", req.body.description], files: [] };
        const allTimelineEvents: ITimelineEvent[] | null = await timelineEventService.getTimelineEventByIncidentId(req.body.incidentId);
        const attachment: Promise<KeyUrlPair[]> = attachmentService.getSignedUrlForKeys(req.body.files)
        await attachment.then(function (result: any) {
            answer.files = result
        })
        if (allTimelineEvents != null) {

            const previousTimeLineEvent: ITimelineEvent = allTimelineEvents[1]
            if (previousTimeLineEvent?.priority != req.body.priority) {
                answer.description[0] = "priority changed: " + previousTimeLineEvent.priority + " => " + req.body.priority + '\n'
                sendToSocket(req.body as ITimelineEvent, ObjectType.TimelineEvent, ActionType.ChangePriority);
            }
            if (previousTimeLineEvent?.type != req.body.type)
                answer.description[1] = "type changed: " + previousTimeLineEvent.type + " => " + req.body.type + '\n'
        }
        res.status(STATUS.SUCCESS).json(answer);
    }
}