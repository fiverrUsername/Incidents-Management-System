import { client } from "../../constPage";
import { constants, FILES } from "../../loggers/constants";
import logger from "../../loggers/log";

export async function updateChannelDescription(channelId: string, description: string): Promise<string | void> {
  try {
    const result: any = await client.conversations.setPurpose({
      channel: channelId,
      purpose: description,
    });
    logger.info({ source: constants.CHANNEL_DESCRIPTION_UPDATED + " " + result.purpose, file: FILES.UPDATE_CHANNEL_DESCRIPTION, method: constants.METHOD.CLIENT })
    return description
  } catch (error) {
    logger.error({ source: constants.CLIENT_ERROR_UPDATING_CHANNEL_DESCRIPTION, file: FILES.UPDATE_CHANNEL_DESCRIPTION, method: constants.METHOD.CLIENT, error: error })
  }
}