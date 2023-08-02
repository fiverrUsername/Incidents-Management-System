import { ITimeLineEvent } from "./timelineEvents";
import { IIncident } from "./incidentManagement";

export enum ObjectType {
    Incident,
    TimelineEvent
  }
  
  export enum ActionType {
    Add,
    Update,
    Delete,
    ChangePriority
}
export interface IMessage {
    objectType: ObjectType,
    actionType: ActionType,
    object: ITimeLineEvent | IIncident | any
  }

