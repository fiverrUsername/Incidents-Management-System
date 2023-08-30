import  {client}  from "../../constPage";
import { constants, files } from "../../loggers/constants";
import logger from "../../loggers/log";

export async function updateChannelDescription(channelId: string, description: string) {
  try {
    const result = await client.conversations.setPurpose({
      channel: channelId,
      purpose: description,
    });
    logger.info({ source: constants.CHANNEL_DESCRIPTION_UPDATED+" "+result.purpose, file: files.UPDATE_CHANNEL_DESCRIPTION ,method:constants.METHOD.CLIENT })
    return description
  } catch (error) {
    logger.error({ source: constants.CLIENT_ERROR_UPDATING_CHANNEL_DESCRIPTION, file: files.UPDATE_CHANNEL_DESCRIPTION ,method:constants.METHOD.CLIENT, error: error })
}
}




