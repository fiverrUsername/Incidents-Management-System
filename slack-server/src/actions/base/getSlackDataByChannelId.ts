import { client } from '../../const';


export async function getSlackDataByChannelId(channelId: string) {
    try {
    const response = await client.conversations.info({
      channel: channelId,
    });
    console.log("data", response);
    if (response?.ok) {
      return  response;
     
    } else {
      return null;
    }
  } 
    catch (error) {
      console.error('Error getting Slack data:', error);
      return null;
    }
  }
  
  
  