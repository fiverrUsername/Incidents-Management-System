

import { Priority } from "../../../ims-server/src/enums/enum";

export interface IChannelData {
    name: string,
    userIds: string[],
    isPrivate: boolean,
    description: string,
    currentPriority:Priority,
}
