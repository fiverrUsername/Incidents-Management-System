import dotenv from 'dotenv';
dotenv.config();

import { InvitePeopleToChannel } from './InvitePeopleToChannel';
import { updateChannelDescription } from './updateChannelDescription'
import { sendMassageOnSpecificPriorityChannel } from '../via-ims/sendMassageOnChangePriority';
import { client } from '../../constPage';
import { IChannelData } from '../../interfaces/channelData';
import logger from '../../loggers/log';
import { constants, FILES } from '../../loggers/constants';

export async function createChannel(data: IChannelData) {
    try {
        const response: any = await client.conversations.create({
            name: data.name,
            user_ids: data.userIds,
            is_private: data.isPrivate
        });
        const channelId: string = response.channel?.id || "no channel id";
        await InvitePeopleToChannel(channelId, data.userIds);
        await updateChannelDescription(channelId, data.description) || "no description";
        await sendMassageOnSpecificPriorityChannel(channelId, data.currentPriority);
        logger.info({ source: constants.SUCCESSFULLY_CREATING_CHANNEL, file: FILES.CREATE_CHANNEL, method: constants.METHOD.CLIENT })
        return channelId;
    } catch (error) {
        logger.error({ source: constants.CLIENT_ERROR_CREATING_CHANNEL, file: FILES.CREATE_CHANNEL, method: constants.METHOD.CLIENT, error: error })
        return null;
    }
}