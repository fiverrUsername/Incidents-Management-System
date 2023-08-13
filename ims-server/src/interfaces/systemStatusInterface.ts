import { Priority } from "../enums/enum";

export interface ISystemStatus {
  id:String
  systemName: String
  incidents: [[string[], string[], string[], string[]]]
  date: Date
  maxPriority: Priority
  incidentCounter: Number
}
