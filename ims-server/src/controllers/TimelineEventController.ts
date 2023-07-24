import { ITimelineEvent } from "../interfaces/ItimelineEvent";
import { constants } from "../loggers/constants";
import { Request, Response, request, response } from 'express';
import timelineEventService from "../services/timelineEventService";
import logger from "../loggers/log";

export default class TimelineEventController {

    async getAllTimelineEvents(req: Request, res: Response): Promise<void> {
        try {
            const timelineEvents: ITimelineEvent[] | null = await timelineEventService.getAllTimelineEvents();
            if (timelineEvents instanceof Error) {
                res.status(404).json({ message: timelineEvents, error: true });
            }
            else res.status(200).json(timelineEvents);
        } catch (error: any) {
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
        } catch (error: any) {
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
        } catch (error: any) {
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
          const timelineEventId: string = req.params.id;
          const index: number = parseInt(req.query.index as string);   
          const file = await timelineEventService.getFileInTimelineEventByIndex(timelineEventId, index); 
          if(file instanceof Error){
                if(file.message=='Timeline event not found'){
                    return res.status(404).json({ message: constants.NOT_FOUND, timelineEventId: req.params.id });
                }
                if(file.message=='Invalid index'){
                    return res.status(400).json({ message: constants.BAD_REQUEST, error: constants.INDEX_NOT_VALID });
                }
                return res.status(500).json({ message: constants.SERVER_ERROR });
          } 
          logger.info({ source: constants.TIMELINE_EVENT, msg: constants.SUCCESS, timelineEventId, indexFile: index, method: constants.METHOD.GET });
          return res.status(200).json(file);
        } catch (error: any) {
          logger.error({ source: constants.TIMELINE_EVENT, err: constants.SERVER_ERROR, method: constants.METHOD.GET });
          return res.status(500).json({ message: error });
        }
      }

    async deleteFileInTimelineEventByIndex(req: Request, res: Response): Promise<Response> {
        try {
            const timelineEventId: string = req.params.id;
            const index: number = parseInt(req.query.index as string);
            const updatedTimelineEvent = await timelineEventService.deleteFileInTimelineEventByIndex(timelineEventId, index);
            if(updatedTimelineEvent instanceof Error){
                if(updatedTimelineEvent.message=='Timeline event not found'){
                    return res.status(404).json({ message: constants.NOT_FOUND, timelineEventId: req.params.id });
                }
                if(updatedTimelineEvent.message=='Invalid index'){
                    return res.status(400).json({ message: constants.BAD_REQUEST, error: constants.INDEX_NOT_VALID });
                }
                else{
                    return res.status(500).json({ message: constants.SERVER_ERROR });
                }
            }
            logger.info({ source: constants.TIMELINE_EVENT, msg: constants.SUCCESS, timelineEventId, indexFile: index, method: constants.METHOD.DELETE });
            return res.status(200).json(updatedTimelineEvent);
        } catch (error: any) {
            logger.error({ source: constants.TIMELINE_EVENT, err: constants.SERVER_ERROR, method: constants.METHOD.DELETE });
            return res.status(500).json({ message: error });
        }
    }
}