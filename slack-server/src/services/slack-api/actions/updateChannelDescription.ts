import { client } from "./const";

async function updateChannelDescription(channelId:string, description:string) {
  try {
    const result = await client.conversations.setPurpose({
      channel: channelId,
      purpose: description,
    });
    console.log(`Channel description updated: ${result.purpose}`);
  } catch (error) {
    console.error('Error updating channel description:', error);
  }
}

const channelId = 'C05JPSL5TCL';
const newDescription = 'This is the updated 2 description of the channel.';
updateChannelDescription(channelId, newDescription);


