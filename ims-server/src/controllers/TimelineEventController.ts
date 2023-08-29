import { Request, Response } from "express";
import { ITimelineEvent } from "../interfaces/ItimelineEvent";
import { constants, status } from "../loggers/constants";
import timelineEventService from "../services/timelineEventService";
import logger from "../loggers/log";
import axios from "axios";
import { ActionType, ObjectType } from '../../../ims-socket/src/interfaces';
import { sendToSocket } from '../services/socket';
import AwsController from "./attachmentController";
import attachmentService from "../services/attachmentService";

export default class TimelineEventController {

    async getAllTimelineEvents(req: Request, res: Response): Promise<Response> {
        try {
            const timelineEvents: ITimelineEvent[] | null = await timelineEventService.getAllTimelineEvents();
            if (timelineEvents instanceof Error) {
                return res.status(status.PAGE_NOT_FOUND).json({ message: timelineEvents, error: true });
            }
            return res.status(status.SUCCESS).json(timelineEvents);
        }
        catch (error: any) {
            return res.status(status.MISSNG_REQUIRED_FIELDS).json({ message: error });
        }
    }

    async getTimelineEventByIncidentId(req: Request, res: Response): Promise<Response> {
        try {
            const timelineEvents: ITimelineEvent[] | null = await timelineEventService.getTimelineEventByIncidentId(req.params.id);
            if (timelineEvents instanceof Error) {
                return res.status(status.PAGE_NOT_FOUND).json({ message: timelineEvents, error: true });
            }
            return res.status(status.SUCCESS).json(timelineEvents);
        }
        catch (error: any) {
            return res.status(status.MISSNG_REQUIRED_FIELDS).json({ message: error });
        }
    }

    async addTimelineEvent(req: Request, res: Response): Promise<Response> {
        try {
            const _timelineEvent = await timelineEventService.addTimelineEvent(req.body);
            if (_timelineEvent == null || _timelineEvent == undefined || _timelineEvent instanceof Error) {
                return res.status(status.SERVER_ERROR).json({ message: constants.SERVER_ERROR });
            }
            sendToSocket(req.body as ITimelineEvent, ObjectType.TimelineEvent, ActionType.Add);
            await timelineEventService.updateFieldsOfIncidentById(_timelineEvent);
            return res.status(status.CREATED_SUCCESS).json(_timelineEvent);
        }
        catch (error: any) {
            return res.status(status.SERVER_ERROR).json({ message: error.message });
        }
    }

    async deleteTimelineEvent(req: Request, res: Response): Promise<Response> {
        try {
            const _timelineEvent: ITimelineEvent | null = await timelineEventService.deleteTimelineEvent(req.params.id);
            if (_timelineEvent instanceof Error || _timelineEvent === null) {
                return res.status(status.PAGE_NOT_FOUND).send({ message: constants.NOT_FOUND, error: true })
            }
            return res.status(status.SUCCESS).send(_timelineEvent)
        }
        catch (error: any) {
            return res.status(status.MISSNG_REQUIRED_FIELDS).send({ message: error, error: true })
        }
    }

    async updateTimelineEvent(req: Request, res: Response): Promise<Response> {
        try {
            const _timelineEvent = await timelineEventService.updateTimelineEvent(req.params.id, req.body);
            if (_timelineEvent instanceof Error) {
                return res.status(status.PAGE_NOT_FOUND).json({ message: constants.NOT_FOUND });
            }
            return res.status(status.SUCCESS).json(_timelineEvent);
        } catch (error: any) {
            return res.status(status.SERVER_ERROR).json({ message: error.message, error: true });
        }
    }

    async getTimelineEventById(req: Request, res: Response): Promise<Response> {
        try {
            const _timelineEvent: ITimelineEvent | null = await timelineEventService.getTimelineEventById(req.params.id);
            if (_timelineEvent instanceof Error || _timelineEvent === null) {
                return res.status(status.PAGE_NOT_FOUND).json({ message: constants.NOT_FOUND, error: true });
            }
            else return res.status(status.SUCCESS).json(_timelineEvent);
        } catch (error: any) {
            return res.status(status.MISSNG_REQUIRED_FIELDS).json({ message: error });
        }
    }

    async getFileInTimelineEventByIndex(req: Request, res: Response): Promise<Response> {
        try {
            const timelineEventId: string = req.params.id;
            const index: number = parseInt(req.query.index as string);
            const file = await timelineEventService.getFileInTimelineEventByIndex(timelineEventId, index);
            if (file === null || file == undefined) {
                return res.status(status.PAGE_NOT_FOUND).json({ message: constants.NOT_FOUND, timelineEventId: req.params.id });
            }
            logger.info({ source: constants.TIMELINE_EVENT, msg: constants.SUCCESS, timelineEventId, indexFile: index, method: constants.METHOD.GET });
            return res.status(status.SUCCESS).json(file);
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
                return res.status(status.PAGE_NOT_FOUND).json({ message: constants.NOT_FOUND, timelineEventId: req.params.id });
            }
            logger.info({ source: constants.TIMELINE_EVENT, msg: constants.SUCCESS, timelineEventId, indexFile: index, method: constants.METHOD.DELETE });
            return res.status(status.SUCCESS).json(updatedTimelineEvent);
        } catch (error: any) {
            return res.status(500).json({ message: error });
        }
    }

    async deleteFileInTimelineEventByValue(req: Request, res: Response): Promise<Response> {
        try {
            const timelineEventId: string = req.params.id;
            const file: string | any = req.query.fileString;
            console.log(file);
            const updatedTimelineEvent = await timelineEventService.deleteFileInTimelineEventByValue(timelineEventId, file);
            if (updatedTimelineEvent == null || updatedTimelineEvent == undefined || updatedTimelineEvent instanceof Error) {
                return res.status(status.PAGE_NOT_FOUND).json({ message: constants.NOT_FOUND, timelineEventId: req.params.id, stringFile: req.query.fileString });
            }
            logger.info({ source: constants.TIMELINE_EVENT, msg: constants.SUCCESS, timelineEventId, file: file, method: constants.METHOD.DELETE });
            return res.status(status.SUCCESS).json(updatedTimelineEvent);
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
        const attachment = attachmentService.getSignedUrlForKeys(req.body.files)
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
        res.status(status.SUCCESS).json(answer);
    }
}