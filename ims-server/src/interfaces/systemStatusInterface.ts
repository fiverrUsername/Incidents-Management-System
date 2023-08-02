import { Priority } from "../enums/enum";

export interface ISystemStatus {
  systemName: string;
  incidents: [[string[], string[], string[], string[]]];
  date: Date;
  maxPriority: Priority;
  incidentCounter: Number;
}
