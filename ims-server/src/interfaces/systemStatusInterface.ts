import { Priority } from "../enums/enum";

export interface ISystemStatus {
    systemName: string
    incidents: string[]
    date: Date
    maxPriority: Priority
    incidentCounter: Number
}