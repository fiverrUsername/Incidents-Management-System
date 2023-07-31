import { ITimelineEvent } from "../interfaces/ItimelineEvent";
import timelineEvent from "../models/timelineEvent";

class TimelineEventRepository {
  async addTimelineEvent(newTimelineEvent: ITimelineEvent): Promise<void | any> {
    try {
      const _timelineEvent=await timelineEvent.create(newTimelineEvent);      
      return _timelineEvent;
    } catch (error: any) {
      console.error(`error: ${error}`);
      return error;
    }
  }

  async getAllTimelineEvents(): Promise<ITimelineEvent[] | any> {
    try {
      return await timelineEvent.find();
    } catch (error: any) {
      console.error(`error: ${error}`);
      return error;
    }
  }

  async getTimelineEventsById(id: string): Promise<ITimelineEvent[] | any> {
    try {
      const _timelineEvent=await timelineEvent.find({ incidentId: id });
      return _timelineEvent;
    } catch (error: any) {
      console.error(`error: ${error}`);
      return error;
    }
  }
  

  async deleteTimelineEvent(id: String): Promise<ITimelineEvent | any> {
    try {
      return await timelineEvent.findByIdAndDelete(id);
    } catch (error: any) {
      console.error(`error: ${error}`);
      return error;
    }
  }

  async updateTimelineEvent(id:string,newTimelineEvent:ITimelineEvent):Promise<void|any>{
    try {
      return await timelineEvent.findOneAndUpdate({id},newTimelineEvent);;
    } catch (error:any) {
      console.error(`error: ${error}`);
      return error;
    }
  }

  async getTimelineEventById(id: String): Promise<ITimelineEvent | any> {
    try {
      const _timelineevent =await timelineEvent.find({ incidentId: id });
      return _timelineevent;
    } catch (error:any) {
      console.error(`error: ${error}`);
      return error;
    }
  }
}
export default new TimelineEventRepository();
