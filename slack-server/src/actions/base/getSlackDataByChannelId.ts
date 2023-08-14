import { ERROR_GETTING_SLACK_CHANNEL_DATA, client } from "../../constPage";

export async function getSlackDataByChannelId(channelId: string) {
    try {
        const response = await client.conversations.info({
            channel: channelId,
        });
        return response;
    }
    catch (error) {
        console.error(ERROR_GETTING_SLACK_CHANNEL_DATA, error);
        return null;
    }
}
