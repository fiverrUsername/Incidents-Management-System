
import { client } from "../../constPage";
import { constants, files } from "../../loggers/constants";
import logger from "../../loggers/log";

export async function JoinBotToChannels(channelId:string){
    (async () => {
        try {
          const response = await client.conversations.join({
            channel: channelId,
          });
          if (response.ok) {
            logger.info({ source: constants.BOT_SUCCESSFULLY_JOINED_CHANNEL+" "+channelId, file: files.JOIN_BOT_TO_CHANNEL ,method:constants.METHOD.CLIENT })
          } else {
            logger.error({ source: constants.CLIENT_ERROR_JOIN_BOT_TO_CHANNEL,  file: files.JOIN_BOT_TO_CHANNEL ,method:constants.METHOD.CLIENT , error: response.error})
          }
        } catch (error) {
            logger.error({ source: constants.CLIENT_ERROR_JOIN_BOT_TO_CHANNEL,  file: files.JOIN_BOT_TO_CHANNEL ,method:constants.METHOD.CLIENT , error: error})
        }
      })();
}



