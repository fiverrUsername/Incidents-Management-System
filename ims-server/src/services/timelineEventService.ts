import { ITimelineEvent } from "../interfaces/ItimelineEvent";
import { constants } from "../loggers/constants";
import logger from "../loggers/log";
import timelineEventRepository from "../repositories/timelineEventRepository";


class TimelineEventService {

  async getAllTimelineEvents(): Promise<ITimelineEvent[] | any> {
    try {
      logger.info({ source: constants.TIMELINE_EVENT, msg: constants.METHOD.GET, success: true });
      const timelineEvent = await timelineEventRepository.getAllTimelineEvents();
      return timelineEvent;
    } catch (error:any) {
      logger.error({ source: constants.TIMELINE_EVENT, method: constants.METHOD.GET, err: true });
      console.error(`error: ${error}`);
      return error;
    }
  }

  async addTimelineEvent(newTimelineEvent: ITimelineEvent): Promise<void | any> {
    try {
      logger.info({ sourece: constants.TIMELINE_EVENT, method:constants.METHOD.POST, timelineEventId:newTimelineEvent._id });
      return await timelineEventRepository.addTimelineEvent(newTimelineEvent);
    } catch (error:any) {
      logger.error({ source: constants.TIMELINE_EVENT, method:constants.METHOD.POST,error:true,timelineEventId:newTimelineEvent._id });
      console.error(`error: ${error}`);
      return error;
    }
  }  

  async deleteTimelineEvent(timeLineEventId:string):Promise<void|any>{
    try {
      logger.info({ sourece: constants.TIMELINE_EVENT, method:constants.METHOD.DELETE, timelineEventId:timeLineEventId });
      return await timelineEventRepository.deleteTimelineEvent(timeLineEventId);
    } catch (error:any) {
      logger.error({ source: constants.TIMELINE_EVENT, method:constants.METHOD.DELETE,error:true,timelineEventId:timeLineEventId });
      console.error(`error: ${error}`);
      return error;
    }
  }

}

export default new TimelineEventService();