import { client } from '../../const';

export async function getSlackDataByChannelId(channelId: string) {
    try {
        const response = await client.conversations.info({
            channel: channelId,
        });
        return response;
    }
    catch (error) {
        console.error('Error getting Slack Channel data:', error);
        return null;
    }
}
