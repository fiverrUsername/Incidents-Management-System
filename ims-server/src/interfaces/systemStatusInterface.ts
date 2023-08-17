import { Priority } from "../enums/enum";

export interface ISystemStatus {
    id:string,
    systemName: string;
    //incidents: [[string[], string[], string[], string[]]]
    incidents: string[][];
    date: Date;
    maxPriority: Priority;
    incidentCounter: number;
}

export interface SystemStatusEntry {
    systemName: string;
    systemData: ISystemStatus[];
}
