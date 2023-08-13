import { ConversationsOpenResponse } from "@slack/web-api";
import { SLACK_API_TOKEN, client } from "../../const";
import { sendMessage } from "./sendMessage";

export async function openDirectMessageWithBot(userId: string, text: string) {
  try {
    const result: ConversationsOpenResponse = await client.conversations.open({
      token: SLACK_API_TOKEN,
      users: userId,
    });
    result.channel?.id && sendMessage({channelId:result.channel.id, text});
  } catch (error) {
    console.error(error);
  }
}
