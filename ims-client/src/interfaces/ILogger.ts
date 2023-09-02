import { Level } from "./enums";

export interface ILogData {
    level: Level,
    message: string,
    timestamp: string,
    source?: string
}

export interface ILogRecievedData {
    message: string,
    source: string
}