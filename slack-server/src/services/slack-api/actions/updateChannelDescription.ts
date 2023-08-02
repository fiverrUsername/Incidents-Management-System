import { client } from "./const";

export async function updateChannelDescription(channelId: string, description: string) {
  try {
    const result = await client.conversations.setPurpose({
      channel: channelId,
      purpose: description,
    });
    console.log(`Channel description updated: ${result.purpose}`);
    return description
  } catch (error) {
    console.error('Error updating channel description:', error);
    
  }
}


