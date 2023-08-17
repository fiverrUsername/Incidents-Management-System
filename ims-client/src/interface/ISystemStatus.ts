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
    systemsStatus: SystemStatusEntry[];
}

export interface SystemStatusEntry {
    systemName: string;
    systemData: ISystemStatus[];
}

export interface IcolorScale{
    from:number,
    to: number,
    name: string,
    color: string,
}
