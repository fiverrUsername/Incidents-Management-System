import { ConversationsOpenResponse } from "@slack/web-api";
import { sendMessage } from "./sendMessage";
import { client } from "../../constPage";

export async function openDirectMessageWithBot(userId: string, text: string) {
  try {
    const result: ConversationsOpenResponse = await client.conversations.open({
      token: process.env.SLACK_API_TOKEN,
      users: userId,
    });
    result.channel?.id && sendMessage({channelId:result.channel.id, text});
  } catch (error) {
    console.error(error);
  }
}
