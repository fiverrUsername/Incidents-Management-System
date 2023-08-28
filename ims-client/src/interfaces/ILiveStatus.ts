import { Priority } from "./enums";

export interface IliveStatus {
    id:string,
    systemName: string,
    incidents?: string[][],
    date: Date,
    maxPriority: Priority,
    incidentCounter: number
}

export interface liveStatusCollection {
    systemsStatus: liveStatusEntry[];
}

export interface liveStatusEntry {
    systemName: string;
    systemData: IliveStatus[];
}

export interface IcolorScale{
    from:number,
    to: number,
    name: string,
    color: string,
}
