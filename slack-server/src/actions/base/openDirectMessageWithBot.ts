import { ConversationsOpenResponse } from "@slack/web-api";
import { sendMessage } from "./sendMessage";
import { client } from "../../constPage";
import logger from "../../loggers/log";
import { constants, files } from "../../loggers/constants";

export async function openDirectMessageWithBot(userId: string, text: string) {
  try {
    const result: ConversationsOpenResponse = await client.conversations.open({
      token: process.env.SLACK_API_TOKEN,
      users: userId,
    });
    result.channel?.id && sendMessage({channelId:result.channel.id, text});
  } catch (error) {
    logger.error({ source: constants.CLIENT_ERROR_OPEN_DIRECT_MESSAGE_WITH_BOT,  file: files.OPEN_DIRECT_MESSAGE_WITH_BOT ,method:constants.METHOD.CLIENT , error: error})
  }
}
