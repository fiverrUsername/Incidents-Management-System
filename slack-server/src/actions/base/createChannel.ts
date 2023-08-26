import dotenv from 'dotenv';
dotenv.config();

import { InvitePeopleToChannel } from './InvitePeopleToChannel';
import { updateChannelDescription } from './updateChannelDescription'
import {  sendMassageOnSpecificPriorityChannel } from '../via-ims/sendMassageOnChangePriority';
import { ERROR_CREATING_CHANNEL, client } from '../../constPage';
import { IChannelData } from '../../interfaces/channelData';

export async function createChannel(data: IChannelData) {
    try {
        const response = await client.conversations.create({
            name: data.name,
            user_ids: data.userIds,
            is_private: data.isPrivate
        });
        console.log('New public channel created:', response.channel?.name);
        const channelId = response.channel?.id || "no channel id";
        await InvitePeopleToChannel(channelId, data.userIds);
        await updateChannelDescription(channelId, data.description) || "no description";
        await sendMassageOnSpecificPriorityChannel(channelId, data.currentPriority);
        return channelId;
    } catch (error) {
        console.error(ERROR_CREATING_CHANNEL, error);
        return null;
    }
}
