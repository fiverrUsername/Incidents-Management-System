import { Priority } from "../enums/enum";

export interface ISystemStatus {
    id:string,
    systemName: string;
    incidents: string[][];
    date: Date;
    maxPriority: Priority;
    incidentCounter: number;
}