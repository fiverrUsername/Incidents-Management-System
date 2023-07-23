import { ConversationsOpenResponse } from "@slack/web-api";
import { SLACK_API_TOKEN, client } from "./const";
import { sendMessageFromBot } from "./sendMessageFromBot";

export async function openDirectMessageWithBot(userId: string, text: string) {
  try {
    const result: ConversationsOpenResponse = await client.conversations.open({
      token: SLACK_API_TOKEN,
      users: userId,
    });
    result.channel?.id && sendMessageFromBot(result.channel.id, text);
  } catch (error) {
    console.error(error);
  }
}
