import { Priority } from "./priority";

export interface IChannelData {
    name: string,
    userIds: string[],
    isPrivate: boolean,
    description: string,
    currentPriority:Priority,
}
