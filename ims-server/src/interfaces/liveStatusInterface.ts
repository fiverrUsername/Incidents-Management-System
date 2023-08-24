import { Priority } from "../enums/enum";

export interface IliveStatus {
    id: string,
    systemName: string;
    incidents: string[][];
    date: Date;
    maxPriority: Priority;
    incidentCounter: number;
}

export interface liveStatusEntry {
    systemName: string;
    systemData: IliveStatus[];
}
