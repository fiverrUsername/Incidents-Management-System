import { Priority } from "../enums/enum";

export interface ISystemStatus {
  id: string;
  systemName: string;
  incidents: [[string[], string[], string[], string[]]];
  date: string;
  maxPriority: Priority;
  incidentCounter: Number;
}
