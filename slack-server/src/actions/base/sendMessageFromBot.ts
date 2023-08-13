import { client } from "../../const";

export async function sendMessageFromBot(channel: string, text: string) {
  try {
    await client.chat.postMessage({
      channel: channel,
      text: text,
    });
  } catch (error) {
    console.error("Error occurred while sending the message:", error);
  }
}
