import { Request, Response } from "express";
import { ITimelineEvent } from "../interfaces/ItimelineEvent";
import { constants, status } from "../loggers/constants";
import timelineEventService from "../services/timelineEventService";
import logger from "../loggers/log";
import axios from "axios";
import { ActionType, ObjectType } from "../../../ims-socket/src/interfaces";
import { sendToSocket } from "../services/socket";
import AwsController from "./attachmentController";
import attachmentService from "../services/attachmentService";
export default class TimelineEventController {
  async getAllTimelineEvents(req: Request, res: Response): Promise<void> {
    try {
      const timelineEvents: ITimelineEvent[] | null =
        await timelineEventService.getAllTimelineEvents();
      if (timelineEvents instanceof Error) {
        res
          .status(status.PAGE_NOT_FOUND)
          .json({ message: timelineEvents, error: true });
      } else res.status(status.SUCCESS).json(timelineEvents);
    } catch (error: any) {
      res.status(status.MISSNG_REQUIRED_FIELDS).json({ message: error });
    }
  }
  async getTimelineEventByIncidentId(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const timelineEvents: ITimelineEvent[] | null =
        await timelineEventService.getTimelineEventByIncidentId(req.params.id);
      if (timelineEvents instanceof Error) {
        res
          .status(status.PAGE_NOT_FOUND)
          .json({ message: timelineEvents, error: true });
      } else res.status(status.SUCCESS).json(timelineEvents);
    } catch (error: any) {
      res.status(status.MISSNG_REQUIRED_FIELDS).json({ message: error });
    }
  }
  async addTimelineEvent(req: Request, res: Response): Promise<Response> {
    try {
      const _timelineEvent = await timelineEventService.addTimelineEvent(
        req.body
      );
      if (_timelineEvent instanceof Error) {
        if (
          _timelineEvent.message === "Validation error" ||
          _timelineEvent.message === "Incident ID not found"
        ) {
          return res
            .status(status.BAD_REQUEST)
            .json({ message: constants.INVALID_MESSAGE });
        }
        return res
          .status(status.SERVER_ERROR)
          .json({ message: constants.SERVER_ERROR });
      }
      sendToSocket(
        req.body as ITimelineEvent,
        ObjectType.TimelineEvent,
        ActionType.Add
      );
      return res.status(status.CREATED_SUCCESS).json(_timelineEvent);
    } catch (error: any) {
      return res.status(status.SERVER_ERROR).json({ message: error.message });
    }
  }
  async deleteTimelineEvent(req: Request, res: Response): Promise<void> {
    try {
      const _timelineEvent: ITimelineEvent | null =
        await timelineEventService.deleteTimelineEvent(req.params.id);
      if (_timelineEvent instanceof Error || _timelineEvent === null) {
        res
          .status(status.PAGE_NOT_FOUND)
          .send({ message: constants.NOT_FOUND, error: true });
      } else {
        res.status(status.SUCCESS).send(_timelineEvent);
      }
    } catch (error: any) {
      res
        .status(status.MISSNG_REQUIRED_FIELDS)
        .send({ message: error, error: true });
    }
  }
  async updateTimelineEvent(req: Request, res: Response): Promise<void> {
    try {
      const _timelineEvent = await timelineEventService.updateTimelineEvent(
        req.params.id,
        req.body
      );
      if (_timelineEvent instanceof Error) {
        if (_timelineEvent.message === constants.MISSNG_REQUIRED_FIELDS) {
          res
            .status(status.MISSNG_REQUIRED_FIELDS)
            .json({ message: constants.MISSNG_REQUIRED_FIELDS, error: true });
        } else if (_timelineEvent.message === constants.NOT_FOUND) {
          res
            .status(status.PAGE_NOT_FOUND)
            .json({ message: constants.NOT_FOUND });
        } else {
          res
            .status(status.MISSNG_REQUIRED_FIELDS)
            .json({ message: _timelineEvent, error: true });
        }
      } else {
        res.status(status.SUCCESS).json(_timelineEvent);
      }
    } catch (error: any) {
      res
        .status(status.MISSNG_REQUIRED_FIELDS)
        .json({ message: error.message, error: true });
    }
  }
  async getTimelineEventById(req: Request, res: Response): Promise<void> {
    try {
      const _timelineEvent: ITimelineEvent | null =
        await timelineEventService.getTimelineEventById(req.params.id);
      if (_timelineEvent instanceof Error || _timelineEvent === null) {
        res
          .status(status.PAGE_NOT_FOUND)
          .json({ message: constants.NOT_FOUND, error: true });
      } else res.status(status.SUCCESS).json(_timelineEvent);
    } catch (error: any) {
      res.status(status.MISSNG_REQUIRED_FIELDS).json({ message: error });
    }
  }
  async getFileInTimelineEventByIndex(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const timelineEventId: string = req.params.id;
      const index: number = parseInt(req.query.index as string);
      const file = await timelineEventService.getFileInTimelineEventByIndex(
        timelineEventId,
        index
      );
      if (file instanceof Error) {
        if (file.message == "Timeline event not found") {
          return res.status(status.PAGE_NOT_FOUND).json({
            message: constants.NOT_FOUND,
            timelineEventId: req.params.id,
          });
        }
        if (file.message == "Invalid index") {
          return res.status(status.BAD_REQUEST).json({
            message: constants.BAD_REQUEST,
            error: constants.INDEX_NOT_VALID,
          });
        }
        return res.status(500).json({ message: constants.SERVER_ERROR });
      }
      logger.info({
        source: constants.TIMELINE_EVENT,
        msg: constants.SUCCESS,
        timelineEventId,
        indexFile: index,
        method: constants.METHOD.GET,
      });
      return res.status(status.SUCCESS).json(file);
    } catch (error: any) {
      return res.status(500).json({ message: error });
    }
  }
  async deleteFileInTimelineEventByIndex(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const timelineEventId: string = req.params.id;
      const index: number = parseInt(req.query.index as string);
      const updatedTimelineEvent =
        await timelineEventService.deleteFileInTimelineEventByIndex(
          timelineEventId,
          index
        );
      if (updatedTimelineEvent instanceof Error) {
        if (updatedTimelineEvent.message == "Timeline event not found") {
          return res.status(status.PAGE_NOT_FOUND).json({
            message: constants.NOT_FOUND,
            timelineEventId: req.params.id,
          });
        }
        if (updatedTimelineEvent.message == "Invalid index") {
          return res.status(status.BAD_REQUEST).json({
            message: constants.BAD_REQUEST,
            error: constants.INDEX_NOT_VALID,
          });
        } else {
          return res
            .status(status.MISSNG_REQUIRED_FIELDS)
            .json({ message: constants.SERVER_ERROR });
        }
      }
      logger.info({
        source: constants.TIMELINE_EVENT,
        msg: constants.SUCCESS,
        timelineEventId,
        indexFile: index,
        method: constants.METHOD.DELETE,
      });
      return res.status(status.SUCCESS).json(updatedTimelineEvent);
    } catch (error: any) {
      return res.status(500).json({ message: error });
    }
  }
  async deleteFileInTimelineEventByValue(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const timelineEventId: string = req.params.id;
      const file: string | any = req.query.key;
      const updatedTimelineEvent =
        await timelineEventService.deleteFileInTimelineEventByValue(
          timelineEventId,
          file
        );
      if (updatedTimelineEvent instanceof Error) {
        if (
          updatedTimelineEvent.message == "Timeline event not found" ||
          updatedTimelineEvent.message === "string file not exist"
        ) {
          return res.status(status.PAGE_NOT_FOUND).json({
            message: constants.NOT_FOUND,
            timelineEventId: req.params.id,
            stringFile: req.query.fileString,
          });
        }
        return res
          .status(status.SERVER_ERROR)
          .json({ message: constants.SERVER_ERROR });
      }
      logger.info({
        source: constants.TIMELINE_EVENT,
        msg: constants.SUCCESS,
        timelineEventId,
        file: file,
        method: constants.METHOD.DELETE,
      });
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
    const allTimelineEvents: ITimelineEvent[] | null =
      await timelineEventService.getTimelineEventById(req.body.incidentId);
    const a = attachmentService.getAllAttachmentByTimeline(req.body.files);
    let file: any;
    let answer: compare = { description: ["", "", ""], files: file };
    await a.then(function (result: any) {
      file = result;
      answer.files = file;
    });
    if (allTimelineEvents != null) {
      let sortedDatesDescending: ITimelineEvent[] = allTimelineEvents
        .slice()
        .sort((a, b) => b.createdDate.getTime() - a.createdDate.getTime());
      const previousTimeLineEvent: ITimelineEvent = sortedDatesDescending[1];
      answer.description[2] = req.body.description;
      if (previousTimeLineEvent?.priority != req.body.priority) {
        answer.description[0] =
          "priority changed: " +
          previousTimeLineEvent.priority +
          " => " +
          req.body.priority +
          "\n";
        sendToSocket(
          req.body as ITimelineEvent,
          ObjectType.TimelineEvent,
          ActionType.ChangePriority
        );
      }
      if (previousTimeLineEvent?.type != req.body.type)
        answer.description[1] =
          "type changed: " +
          previousTimeLineEvent.type +
          " => " +
          req.body.type +
          "\n";
    }
    res.status(status.SUCCESS).json(answer);
  }
}
