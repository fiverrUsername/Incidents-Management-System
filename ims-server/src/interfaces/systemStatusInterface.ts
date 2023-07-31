import { IIncident } from "./IncidentInterface";

export interface ISystemStatus {
    systemName: string
    incidents: number[]
    date: string
    maxPriority: string
}