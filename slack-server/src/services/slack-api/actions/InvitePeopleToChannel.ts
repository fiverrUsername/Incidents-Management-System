import { client } from "./const";

export async function InvitePeopleToChannel(channelId:string,users:string[]){
    await client.conversations.invite({
        // Channel ID of the new channel
        channel: channelId,
        // User ID of yourself
        users: users.join(",")
      });
}