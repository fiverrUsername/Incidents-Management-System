import { InvitePeopleToChannel } from './InvitePeopleToChannel';
import { IIncident } from '../../../../ims-server/src/interfaces/IncidentInterface';
import { ActionType, ObjectType } from '../../../../ims-socket/src/interfaces';
import { sendToSocket } from '../../socket';
import { updateChannelDescription } from './updateChannelDescription'
import { sendMassageOnChangePriority } from '../via-ims/sendMassageOnChangePriority';
import { client } from '../../const';
import { IChannelData } from '../../interfaces/channelData';
const userIds = ['U05HXKPD259'];
export async function createChannel(data: IChannelData) {
    try {
        const response = await client.conversations.create({
            name: data.name,
            user_ids: data.userIds,
            is_private: data.isPrivate
        });
        console.log('New public channel created:', response.channel?.name);
        const channelId = response.channel?.id || "no channel id";
        await InvitePeopleToChannel(channelId, userIds);
        await updateChannelDescription(channelId, data.description) || "no description";
        await sendMassageOnChangePriority(channelId, data.currentPriority);
        return channelId;
    } catch (error) {
        console.error('Error creating channel:', error);
        return null;
    }
}
