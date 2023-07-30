import {ITimelineEvent} from '../../ims-server/src/interfaces/ItimelineEvent'
import {IIncident} from '../../ims-server/src/interfaces/IncidentInterface'

export enum ObjectType {
  Incident,
  TimelineEvent
}

export enum ActionType {
  Add,
  Update,
  Delete,
}

export interface IMessage {
  objectType: ObjectType,
  actionType: ActionType,
  object: ITimelineEvent | IIncident
}
