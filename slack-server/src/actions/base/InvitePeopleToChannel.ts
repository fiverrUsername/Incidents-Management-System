import { client } from "../../constPage";
import { constants, files } from "../../loggers/constants";
import logger from "../../loggers/log";

export async function InvitePeopleToChannel(channelId:string,users:string[]){
  try {
    await client.conversations.invite({
      channel: channelId,
      users: users.join(",")
    });
    logger.info({ source: constants.SUCCESSFULLY_INVITE_PEOPLE_TO_CHANNEL+" "+channelId+" users:"+users, file: files.INVITE_PEOPLE_TO_CHANNEL ,method:constants.METHOD.CLIENT })
  } catch (error) {
    logger.error({ source: constants.CLIENT_ERROR_INVITE_PEOPLE_TO_CHANNEL,  file: files.INVITE_PEOPLE_TO_CHANNEL ,method:constants.METHOD.CLIENT , error: error})
  }
}
