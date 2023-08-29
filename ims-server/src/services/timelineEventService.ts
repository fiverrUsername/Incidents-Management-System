import { validate } from "class-validator";
import { ITimelineEventDto } from "../dto/timelineEventDto";
import { Priority } from "../enums/enum";
import { IIncident } from "../interfaces/IncidentInterface";
import { ITimelineEvent } from "../interfaces/ItimelineEvent";
import { ITag } from "../interfaces/tagInterface";
import { constants } from "../loggers/constants";
import logger from "../loggers/log";
import incidentRepository from "../repositories/incidentRepository";
import timelineEventRepository from "../repositories/timelineEventRepository";
import incidentService from "./incidentService";
import liveStatusService from "./liveStatusService";

class TimelineEventService {
  async getAllTimelineEvents(): Promise<ITimelineEvent[] | any> {
    try {
      logger.info({
        source: constants.TIMELINE_EVENT,
        method: constants.METHOD.GET,
        success: true
      });
      const timelineEvent = await timelineEventRepository.getAllTimelineEvents();
      return timelineEvent;
    } catch (error: any) {
      logger.error({
        source: constants.TIMELINE_EVENT,
        method: constants.METHOD.GET,
        err: true
      });
      console.error(`error: ${error}`);
      return error;
    }
  }

  async getTimelineEventByIncidentId(id: string): Promise<ITimelineEvent[] | any> {
    try {
      logger.info({
        source: constants.TIMELINE_EVENT,
        msg: constants.METHOD.GET,
        success: true
      });
      const timelineEvent = await timelineEventRepository.getTimelineEventByIncidentId(id);
      return timelineEvent;
    } catch (error: any) {
      logger.error({
        source: constants.TIMELINE_EVENT,
        method: constants.METHOD.GET,
        err: true
      });
      console.error(`error: ${error}`);
      return error;
    }
  }

  async addTimelineEvent(newTimelineEvent: ITimelineEvent): Promise<void | any> {
    try {
      const incident: IIncident = await incidentRepository.getIncidentByField(newTimelineEvent.incidentId!, "id");
      const priority: Priority = incident.currentPriority
      const tags: ITag[] = incident.currentTags
      newTimelineEvent.channelId = incident.channelId;
      const _timelineEvent = new ITimelineEventDto(newTimelineEvent);
      const validationErrors = await validate(_timelineEvent);
      if (validationErrors.length > 0) {
        logger.error({ source: constants.TIMELINE_EVENT, err: "Validation error", validationErrors: validationErrors.map((error) => error.toString()), });
        return new Error("Validation error");
      }
      if (tags.length != newTimelineEvent.tags.length) {
        const newIncident = incident
        const newTags = newTimelineEvent.tags.filter(tag => {
          return !tags.some(existingTag => existingTag.name === tag.name);
        });

        newTags.forEach(tag => {
          newIncident.currentTags = [tag]
          liveStatusService.liveStatusByIncident(newIncident)
        })
      }
      tags.map((tag) => {
        liveStatusService.updateLiveStatusByTimeLineEvent(newTimelineEvent, String(tag.name), priority)
      })
      logger.info({ sourece: constants.TIMELINE_EVENT, method: constants.METHOD.POST, timelineEventId: newTimelineEvent.id });
      return await timelineEventRepository.addTimelineEvent(newTimelineEvent);
    } catch (error: any) {
      logger.error({ source: constants.TIMELINE_EVENT, method: constants.METHOD.POST, error: true, timelineEventId: newTimelineEvent.id });
      console.error(`error: ${error}`);
      return error;
    }
  }

  async updateTimelineEvent(timeLineEventId: string, newTimelineEvent: ITimelineEvent): Promise<void | any> {
    try {
      logger.info({
        sourece: constants.TIMELINE_EVENT,
        method: constants.METHOD.PUT,
        timelineEventId: timeLineEventId
      });
      return await timelineEventRepository.updateTimelineEvent(timeLineEventId, newTimelineEvent);
    } catch (error: any) {
      logger.error({
        source: constants.TIMELINE_EVENT,
        method: constants.METHOD.PUT,
        error: true,
        timelineEventId: timeLineEventId
      });
      console.error(`error: ${error}`);
      return error;
    }
  }

  async getTimelineEventById(id: String): Promise<ITimelineEvent | any> {
    try {
      const _timelineEvent = await timelineEventRepository.getTimelineEventById(id);
      if (_timelineEvent) {
        logger.info({
          source: constants.TIMELINE_EVENT,
          method: constants.METHOD.GET,
          timelineEventId: id
        });
      }
      return _timelineEvent;
    } catch (error: any) {
      logger.error({
        source: constants.TIMELINE_EVENT,
        err: constants.NOT_FOUND,
        timelineEventId: id
      });
      console.error(`error: ${error}`);
      return error;
    }
  }

  async deleteTimelineEvent(timeLineEventId: string): Promise<void | any> {
    try {
      logger.info({
        sourece: constants.TIMELINE_EVENT,
        method: constants.METHOD.DELETE,
        timelineEventId: timeLineEventId,
      });
      return await timelineEventRepository.deleteTimelineEvent(timeLineEventId);
    } catch (error: any) {
      logger.error({
        source: constants.TIMELINE_EVENT,
        method: constants.METHOD.DELETE,
        error: true,
        timelineEventId: timeLineEventId,
      });
      console.error(`error: ${error}`);
      return error;
    }
  }

  async getFileInTimelineEventByIndex(id: string, index: number): Promise<string | any> {
    try {
      const timelineEvent: ITimelineEvent | null = await this.getTimelineEventById(id);
      if (timelineEvent === null) {
        logger.error({ source: constants.TIMELINE_EVENT, err: constants.NOT_FOUND, timelineEventId: id, indexFile: index, method: constants.METHOD.GET })
        return new Error('Timeline event not found');
      }
      const files: string[] = timelineEvent.files;
      if (!(typeof index === 'number' && !isNaN(index)) || files.length === 0 || index < 0 || index >= files.length) {
        logger.error({ source: constants.TIMELINE_EVENT, err: constants.INDEX_NOT_VALID, timelineEventId: timelineEvent?.id, indexFile: index, method: constants.METHOD.GET })
        return new Error('Invalid index');
      }
      return files[index];
    } catch (error: any) {
      logger.error({ source: constants.TIMELINE_EVENT, err: constants.SERVER_ERROR, method: constants.METHOD.GET })
      return new Error(`Error retrieving file in timeline event by index: ${error}`);
    }
  }

  async deleteFileInTimelineEventByIndex(id: string, index: number): Promise<ITimelineEvent | any> {
    try {
      const timelineEvent: ITimelineEvent | null = await this.getTimelineEventById(id);
      if (timelineEvent === null) {
        logger.error({ source: constants.TIMELINE_EVENT, err: constants.NOT_FOUND, timelineEventId: id, indexFile: index, method: constants.METHOD.DELETE })
        return new Error('Timeline event not found');
      }
      const files: string[] = timelineEvent.files;
      if (!(typeof index === 'number' && !isNaN(index)) || files.length === 0 || index < 0 || index >= files.length) {
        logger.error({ source: constants.TIMELINE_EVENT, err: constants.INDEX_NOT_VALID, timelineEventId: timelineEvent?.id, indexFile: index, method: constants.METHOD.DELETE })
        return new Error('Invalid index');
      }
      timelineEvent.files.splice(index, 1);
      return await timelineEventRepository.updateTimelineEvent(id, timelineEvent);;
    } catch (error: any) {
      logger.error({ source: constants.TIMELINE_EVENT, err: constants.SERVER_ERROR, method: constants.METHOD.DELETE });
      return new Error(`Error deleting file in timeline event by index: ${error}`);
    }
  }

  async deleteFileInTimelineEventByValue(id: string, file: string): Promise<ITimelineEvent | any> {
    try {
      const timelineEvent: ITimelineEvent | null = await this.getTimelineEventById(id);
      if (timelineEvent === null) {
        logger.error({ source: constants.TIMELINE_EVENT, err: constants.NOT_FOUND, timelineEventId: id, file: file, method: constants.METHOD.DELETE })
        return new Error('Timeline event not found');
      }
      if (!timelineEvent.files.some((v) => v === file)) {
        return new Error('string file not exist')
      }
      timelineEvent.files = timelineEvent.files.filter((v) => v !== file);
      return await timelineEventRepository.updateTimelineEvent(id, timelineEvent);;
    } catch (error: any) {
      logger.error({ source: constants.TIMELINE_EVENT, err: constants.SERVER_ERROR, method: constants.METHOD.DELETE });
      return new Error(`Error deleting file in timeline event by string file: ${error}`);
    }
  }

  async updateStatusAndPriorityOfIncidentById(timeline: ITimelineEvent): Promise<IIncident | any> {
    try {
      const incident: IIncident = await incidentRepository.getIncidentById(timeline.incidentId);
      incident.currentPriority = timeline.priority;
      incident.status = timeline.status;
      incident.currentTags = timeline.tags;
      return await incidentService.updateIncident(incident.id!, incident);
    } catch (err: any) {
      return new Error(err);
    }
  }

}
export default new TimelineEventService();
