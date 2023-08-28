import { ERROR_GETTING_SLACK_CHANNEL_DATA, client } from "../../constPage";

export async function getSlackDataByChannelId(channelId: string) {
    try {
        const response = await client.conversations.info({
            channel: channelId,
        });
        if (response?.ok) {
            return response;
        } else {
            return null;
        }
    }
    catch (error) {
        console.error(ERROR_GETTING_SLACK_CHANNEL_DATA, error);
        return null;
    }
}


