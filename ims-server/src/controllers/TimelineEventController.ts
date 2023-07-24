import { Request, Response } from "express";
import { TimelineEventDto } from "../classValidator/timelineEventDto";
import { constants } from "../loggers/constants";
import timelineEventService from "../services/timelineEventService";

export default class TimelineEventController {
  async getAllTimelineEvents(req: Request, res: Response): Promise<void> {
    try {
      const timelineEvents: TimelineEventDto =
        await timelineEventService.getAllTimelineEvents();
      if (timelineEvents === null) {
        res
          .status(404)
          .json({ message: "No timeline events found.", error: true });
        return;
      }
      res.status(200).json(timelineEvents);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async addTimelineEvent(req: Request, res: Response): Promise<void> {
    try {
      const timelineEventData: TimelineEventDto =
        await timelineEventService.addTimelineEvent(req.body);
      res.status(201).json(timelineEventData);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async deleteTimelineEvent(req: Request, res: Response): Promise<void> {
    try {
      const timelineEventId: string = req.params.id;
      const timelineEvent: TimelineEventDto =
        await timelineEventService.deleteTimelineEvent(timelineEventId);
      if (timelineEvent === null) {
        res.status(404).json({ message: constants.NOT_FOUND, error: true });
      } else {
        res.status(200).send(timelineEvent);
      }
    } catch (error: any) {
      res.status(500).send({ message: error, error: true });
    }
  }
}