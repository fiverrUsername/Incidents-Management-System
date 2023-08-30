import { client } from "../../constPage";
import { constants, files } from "../../loggers/constants";
import logger from "../../loggers/log";

export async function getUsers() {
  try {
    await client.users.list();
    logger.info({ source: constants.SUCCESSFULLY_GET_USERS_IN_SLACK, file: files.GET_USERS ,method:constants.METHOD.CLIENT })
  } catch (error) {
    logger.error({ source: constants.CLIENT_ERROR_GET_USERS_IN_SLACK,  file: files.INVITE_PEOPLE_TO_CHANNEL ,method:constants.METHOD.CLIENT , error: error})
  }
}
