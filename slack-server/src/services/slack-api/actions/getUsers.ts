import { LogLevel, WebClient } from "@slack/web-api";

export async function getUsers() {
    const token = "xoxb-5601969176276-5599490438291-Wp0fXzjDa99HGkNDA33Co8HW"; // Replace with your actual Slack token
    const client = new WebClient(token, {
      // LogLevel can be imported and used to make debugging simpler
      logLevel: LogLevel.DEBUG
    });
  
    try {
      // Call the users.list method using the WebClient
      const userList = await client.users.list();
  
      // The list of users is in the members field of the API response
      const users = userList.members;
  
      // Loop through the list of users and print their user IDs and names
      if(users!=null)
      users.forEach(user => {
        console.log("User ID:", user.id);
        console.log("User Name:", user.real_name);
        console.log("---------------------------------------");
      });
    } catch (error) {
      console.error(error);
    }
  }