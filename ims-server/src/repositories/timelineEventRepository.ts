import { ITimelineEvent } from "../interfaces/ItimelineEvent";
import timelineEvent from "../models/timelineEvent";

class TimelineEventRepository {

  async addTimelineEvent(newTimelineEvent: ITimelineEvent): Promise<void | any> {
    try {
      await timelineEvent.create(newTimelineEvent);
    } catch (error:any) {
      console.error(`error: ${error}`);
      return error;
    }
  }

  async getAllTimelineEvents(): Promise<ITimelineEvent[] | any> {
    try {
      return await timelineEvent.find();
    } catch (error:any) {
      console.error(`error: ${error}`);
      return error;
    }
  }

  async deleteTimelineEvent(id: String): Promise<ITimelineEvent | any> {
    try {
      return await timelineEvent.findByIdAndDelete(id);
    } catch (error:any) {
      console.error(`error: ${error}`);
      return error;
    }
  }
}
export default new TimelineEventRepository();