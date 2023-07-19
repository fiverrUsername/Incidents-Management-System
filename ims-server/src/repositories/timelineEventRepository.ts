import { ITimelineEvent } from "../interfaces/ItimelineEvent";
import timelineEvent from "../models/timelineEvent";

class TimelineEventRepository {

  async addTimelineEvent(newTimelineEvent: ITimelineEvent): Promise<void | null> {
    try {
      await timelineEvent.create(newTimelineEvent);
    } catch (error) {
      console.error(`error: ${error}`);
      return null;
    }
  }

  async getAllTimelineEvents(): Promise<ITimelineEvent[] | null> {
    try {
      return await timelineEvent.find();
    } catch (error) {
      console.error(`error: ${error}`);
      return null;
    }
  }

  async deleteTimelineEvent(id: String): Promise<ITimelineEvent | null> {
    try {
      return await timelineEvent.findByIdAndDelete(id);
    } catch (error) {
      console.error(`error: ${error}`);
      return null;
    }
  }
}
export default new TimelineEventRepository();