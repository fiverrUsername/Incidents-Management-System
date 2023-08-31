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
      const timelines = await timelineEventRepository.getAllTimelineEvents();
      if (timelines instanceof Error) {
        logger.error({ source: constants.TIMELINE_EVENT, method: constants.METHOD.GET, err: true });
        return;
      }
      logger.info({ source: constants.TIMELINE_EVENT, method: constants.METHOD.GET, success: true });
      return timelines;
    } catch (error: any) {
      console.error(`error: ${error}`);
    }
  }

  async getTimelineEventByIncidentId(id: string): Promise<ITimelineEvent[] | any> {
    try {
      const timelineEvent = await timelineEventRepository.getTimelineEventByIncidentId(id);
      if (timelineEvent instanceof Error) {
        logger.error({ source: constants.TIMELINE_EVENT, method: constants.METHOD.GET, err: true });
        return;
      }
      logger.info({ source: constants.TIMELINE_EVENT, msg: constants.METHOD.GET, success: true });
      return timelineEvent;
    } catch (error: any) {
      console.error(`error: ${error}`);
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
        return new Error("Validation Error");
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
      const timeline = await timelineEventRepository.addTimelineEvent(newTimelineEvent);
      if (timeline instanceof Error) {
        logger.error({ source: constants.TIMELINE_EVENT, method: constants.METHOD.POST, error: true, timelineEventId: newTimelineEvent.id });
        return;
      }
      logger.info({ sourece: constants.TIMELINE_EVENT, method: constants.METHOD.POST, timelineEventId: newTimelineEvent.id });
      return timeline;
    } catch (error: any) {
      logger.error({ source: constants.TIMELINE_EVENT, method: constants.METHOD.POST, error: true, timelineEventId: newTimelineEvent.id });
      console.error(`error: ${error}`);
    }
  }

  async updateTimelineEvent(timeLineEventId: string, newTimelineEvent: ITimelineEvent): Promise<void | any> {
    try {
      const timeline = await timelineEventRepository.updateTimelineEvent(timeLineEventId, newTimelineEvent);
      if (timeline instanceof Error) {
        logger.error({ source: constants.TIMELINE_EVENT, method: constants.METHOD.PUT, error: true, timelineEventId: timeLineEventId });
        return;
      }
      logger.info({ sourece: constants.TIMELINE_EVENT, method: constants.METHOD.PUT, timelineEventId: timeLineEventId });
      return timeline;
    } catch (error: any) {
      logger.error({ source: constants.TIMELINE_EVENT, method: constants.METHOD.PUT, error: true, timelineEventId: timeLineEventId });
      console.error(`error: ${error}`);
    }
  }

  async getTimelineEventById(id: String): Promise<ITimelineEvent | any> {
    try {
      const _timelineEvent = await timelineEventRepository.getTimelineEventById(id);
      if (_timelineEvent instanceof Error) {
        logger.error({ source: constants.TIMELINE_EVENT, err: constants.NOT_FOUND, timelineEventId: id });
        return;
      }
      logger.info({ source: constants.TIMELINE_EVENT, method: constants.METHOD.GET, timelineEventId: id });
      return _timelineEvent;
    } catch (error: any) {
      logger.error({ source: constants.TIMELINE_EVENT, err: constants.NOT_FOUND, timelineEventId: id });
      console.error(`error: ${error}`);
    }
  }

  async deleteTimelineEvent(timeLineEventId: string): Promise<void | any> {
    try {
      const timeline: ITimelineEvent = await timelineEventRepository.deleteTimelineEvent(timeLineEventId);
      if (timeline instanceof Error) {
        logger.error({ source: constants.TIMELINE_EVENT, method: constants.METHOD.DELETE, error: true, timelineEventId: timeLineEventId });
        return;
      }
      logger.info({ sourece: constants.TIMELINE_EVENT, method: constants.METHOD.DELETE, timelineEventId: timeLineEventId });
      return timeline;
    } catch (error: any) {
      logger.error({ source: constants.TIMELINE_EVENT, method: constants.METHOD.DELETE, error: true, timelineEventId: timeLineEventId });
      console.error(`error: ${error}`);
    }
  }

  async getFileInTimelineEventByIndex(id: string, index: number): Promise<string | any> {
    try {
      const timelineEvent: ITimelineEvent | null = await this.getTimelineEventById(id);
      if (timelineEvent === null) {
        logger.error({ source: constants.TIMELINE_EVENT, err: constants.NOT_FOUND, timelineEventId: id, indexFile: index, method: constants.METHOD.GET })
        return;
      }
      const files: string[] = timelineEvent.files;
      if (!(typeof index === 'number' && !isNaN(index)) || files.length === 0 || index < 0 || index >= files.length) {
        logger.error({ source: constants.TIMELINE_EVENT, err: constants.INDEX_NOT_VALID, timelineEventId: timelineEvent?.id, indexFile: index, method: constants.METHOD.GET })
        return;
      }
      logger.info({ source: constants.TIMELINE_EVENT, timelineEventId: timelineEvent?.id, indexFile: index, method: constants.METHOD.GET })
      return files[index];
    } catch (error: any) {
      logger.error({ source: constants.TIMELINE_EVENT, err: constants.SERVER_ERROR, method: constants.METHOD.GET })
    }
  }

  async deleteFileInTimelineEventByIndex(id: string, index: number): Promise<ITimelineEvent | any> {
    try {
      const timelineEvent: ITimelineEvent | null = await this.getTimelineEventById(id);
      if (timelineEvent === null) {
        logger.error({ source: constants.TIMELINE_EVENT, err: constants.NOT_FOUND, timelineEventId: id, indexFile: index, method: constants.METHOD.DELETE })
        return;
      }
      const files: string[] = timelineEvent.files;
      if (!(typeof index === 'number' && !isNaN(index)) || files.length === 0 || index < 0 || index >= files.length) {
        logger.error({ source: constants.TIMELINE_EVENT, err: constants.INDEX_NOT_VALID, timelineEventId: timelineEvent?.id, indexFile: index, method: constants.METHOD.DELETE })
        return;
      }
      timelineEvent.files.splice(index, 1);
      const timeline = await timelineEventRepository.updateTimelineEvent(id, timelineEvent);
      if (timeline instanceof Error) {
        logger.error({ source: constants.TIMELINE_EVENT, timelineEventId: timelineEvent?.id, indexFile: index, method: constants.METHOD.DELETE })
        return;
      }
      logger.info({ source: constants.TIMELINE_EVENT, timelineEventId: timelineEvent?.id, indexFile: index, method: constants.METHOD.DELETE })
      return timeline;
    } catch (error: any) {
      logger.error({ source: constants.TIMELINE_EVENT, err: constants.SERVER_ERROR, method: constants.METHOD.DELETE });
    }
  }

  async deleteFileInTimelineEventByValue(id: string, file: string): Promise<ITimelineEvent | any> {
    try {
      const timelineEvent: ITimelineEvent | null = await this.getTimelineEventById(id);
      if (timelineEvent === null) {
        logger.error({ source: constants.TIMELINE_EVENT, err: constants.NOT_FOUND, timelineEventId: id, file: file, method: constants.METHOD.DELETE })
        return;
      }
      if (!timelineEvent.files.some((v) => v === file)) {
        return;
      }
      timelineEvent.files = timelineEvent.files.filter((v) => v !== file);
      const timeline = await timelineEventRepository.updateTimelineEvent(id, timelineEvent);
      if (timeline instanceof Error) {
        logger.error({ source: constants.TIMELINE_EVENT, file: file, method: constants.METHOD.DELETE });
        return;
      }
      logger.info({ source: constants.TIMELINE_EVENT, file: file, method: constants.METHOD.DELETE });
      return timeline;
    } catch (error: any) {
      logger.error({ source: constants.TIMELINE_EVENT, err: constants.SERVER_ERROR, method: constants.METHOD.DELETE });
    }
  }

  async updateFieldsOfIncidentById(timeline: ITimelineEvent): Promise<IIncident | any> {
    try {
      const incident: IIncident = await incidentRepository.getIncidentById(timeline.incidentId);
      incident.currentPriority = timeline.priority;
      incident.status = timeline.status;
      incident.currentTags = timeline.tags;
      incident.type = timeline.type;
      return await incidentService.updateIncident(incident.id!, incident);
    } catch (err: any) {
      console.error(err);
    }
  }

}

export default new TimelineEventService()