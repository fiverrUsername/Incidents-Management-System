
import { client } from "../../constPage";

export async function JoinBotToChannels(channelId:string){
    (async () => {
        try {
          const response = await client.conversations.join({
            channel: channelId,
          });
      
          if (response.ok) {
            console.log(`Bot successfully joined channel ${channelId}`);
          } else {
            console.error('Error joining channel:', response.error);
          }
        } catch (error) {
          console.error('An error occurred:', error);
        }
      })();
}



