import { Priority } from "./enums";

export interface ISystemStatus {
    id:string,
    systemName: string,
    incidents?: string[][],
    date: Date,
    maxPriority: Priority,
    incidentCounter: number
}
 

export interface SystemStatusCollection {
    systemsStatus: {
        systemName: string;
        systemData: ISystemStatus[];
    }[];
}