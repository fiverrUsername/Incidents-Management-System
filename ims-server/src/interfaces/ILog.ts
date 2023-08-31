import {Level} from '../enums/enum'
export default interface ILogData {
    level: Level,
    message: string,
    timestamp: string,
    source?: string
}
