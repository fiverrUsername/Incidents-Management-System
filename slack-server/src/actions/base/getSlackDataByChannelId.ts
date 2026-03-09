import { client } from "../../constPage";
import { constants, FILES } from "../../loggers/constants";
import logger from "../../loggers/log";

export async function getSlackDataByChannelId(channelId: string): Promise<any> {
    try {
        const response: any = await client.conversations.info({
            channel: channelId,
        });
        if (response?.ok) {
            logger.info({ source: constants.SUCCESSFULLY_GET_SLACK_DATA + " " + channelId, file: FILES.GET_SLACK_DATA, method: constants.METHOD.CLIENT })
            return response;
        } else {
            logger.error({ source: constants.CLIENT_ERROR_GET_SLACK_DATA + "channelId: " + channelId, file: FILES.GET_SLACK_DATA, method: constants.METHOD.CLIENT, error: response.error })
            return null;
        }
    }
    catch (error) {
        logger.error({ source: constants.CLIENT_ERROR_GET_SLACK_DATA + "channelId: " + channelId, file: FILES.GET_SLACK_DATA, method: constants.METHOD.CLIENT, error: error })
        return null;
    }
}