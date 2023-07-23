import { ITimelineEvent } from "../interfaces/ItimelineEvent";
import { constants } from "../loggers/constants";
import logger from "../loggers/log";
import timelineEvent from "../models/timelineEvent";
import timelineEventRepository from "../repositories/timelineEventRepository";
import fs from 'fs';
import path from 'path';
import axios from 'axios';


class TimelineEventService {

  async getAllTimelineEvents(): Promise<ITimelineEvent[] | any> {
    try {
      logger.info({ source: constants.TIMELINE_EVENT, method: constants.METHOD.GET, success: true });
      const timelineEvent = await timelineEventRepository.getAllTimelineEvents();
      return timelineEvent;
    } catch (error: any) {
      logger.error({ source: constants.TIMELINE_EVENT, method: constants.METHOD.GET, err: true });
      console.error(`error: ${error}`);
      return error;
    }
  }

  async getTimelineEventsById(id: string): Promise<ITimelineEvent[] | any> {
    try {
      logger.info({ source: constants.TIMELINE_EVENT, msg: constants.METHOD.GET, success: true });
      const timelineEvent = await timelineEventRepository.getTimelineEventsById(id);
      return timelineEvent;
    } catch (error:any) {
      logger.error({ source: constants.TIMELINE_EVENT, method: constants.METHOD.GET, err: true });
      console.error(`error: ${error}`);
      return error;
    }
  }

  async addTimelineEvent(newTimelineEvent: ITimelineEvent): Promise<void | any> {
    try {
      logger.info({ sourece: constants.TIMELINE_EVENT, method: constants.METHOD.POST, timelineEventId: newTimelineEvent._id });
      return await timelineEventRepository.addTimelineEvent(newTimelineEvent);
    } catch (error: any) {
      logger.error({ source: constants.TIMELINE_EVENT, method: constants.METHOD.POST, error: true, timelineEventId: newTimelineEvent._id });
      console.error(`error: ${error}`);
      return error;
    }
  }

  async deleteTimelineEvent(timeLineEventId: string): Promise<void | any> {
    try {
      logger.info({ sourece: constants.TIMELINE_EVENT, method: constants.METHOD.DELETE, timelineEventId: timeLineEventId });
      return await timelineEventRepository.deleteTimelineEvent(timeLineEventId);
    } catch (error: any) {
      logger.error({ source: constants.TIMELINE_EVENT, method: constants.METHOD.DELETE, error: true, timelineEventId: timeLineEventId });
      console.error(`error: ${error}`);
      return error;
    }
  }

  async updateTimelineEvent(timeLineEventId: string, newTimelineEvent: ITimelineEvent): Promise<void | any> {
    try {
      logger.info({ sourece: constants.TIMELINE_EVENT, method: constants.METHOD.PUT, timelineEventId: timeLineEventId });
      return await timelineEventRepository.updateTimelineEvent(timeLineEventId, newTimelineEvent);
    } catch (error: any) {
      logger.error({ source: constants.TIMELINE_EVENT, method: constants.METHOD.PUT, error: true, timelineEventId: timeLineEventId });
      console.error(`error: ${error}`);
      return error;
    }
  }

  async getTimelineEventById(id: String): Promise<ITimelineEvent | any> {
    try {
      const _timelineEvent = await timelineEventRepository.getTimelineEventById(id);
      if (_timelineEvent) {
        logger.info({ source: constants.TIMELINE_EVENT, method: constants.METHOD.GET, timelineEventId: id });
      }
      return _timelineEvent;
    } catch (error: any) {
      logger.error({ source: constants.TIMELINE_EVENT, err: constants.NOT_FOUND, timelineEventId: id });
      console.error(`error: ${error}`);
      return error;
    }
  }

}
export default new TimelineEventService();