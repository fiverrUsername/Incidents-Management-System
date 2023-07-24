
//Get slack users with userId



// const axios = require('axios');
// const slackApiToken = 'xoxe.xoxp-1-Mi0yLTU2MDk1MTEzNDIxNjMtNTYwOTY2OTQ0NDE3OS01NTk1NjA3NDgyMDA3LTU2MjMwNjA4NDk2MzUtMzljYWVlNTAzMzZjNGEzNjVjNmM4YTZlNTY1YjY2NTJmYmY5YjNmMzFmYzA0NDkwOTNiYzk2OTA3MjY4MDkwNw';

// async function getSlackUsers() {
//   try {
//     const response = await axios.get('https://slack.com/api/users.list', {
//       headers: {
//         Authorization: `Bearer ${slackApiToken}`,
//       },
//     });

//     const data = response.data;

//     if (data.ok) {
//       return data.members;
//     } else {
//       console.error(`Failed to fetch users: ${data.error}`);
//       return [];
//     }
//   } catch (error) {
//     console.error('Error fetching users:', error);
//     return [];
//   }
// }


// async function main() {
//     const users = await getSlackUsers();

//     console.log('Slack Users:');
//     users.forEach((user) => {
//       console.log(`${user.profile.real_name} (${user.id})`);
//     });
//   }

//   main();










//+++++++++++++++++++++++++++++++++
//קבלת שמות כל ה- channels
// const axios = require('axios');

// const slackApiToken = 'xoxe.xoxp-1-Mi0yLTU2MDk1MTEzNDIxNjMtNTYwOTY2OTQ0NDE3OS01NTk1NjA3NDgyMDA3LTU2MjMwNjA4NDk2MzUtMzljYWVlNTAzMzZjNGEzNjVjNmM4YTZlNTY1YjY2NTJmYmY5YjNmMzFmYzA0NDkwOTNiYzk2OTA3MjY4MDkwNw';

// async function getAllChannels() {
//   try {
//     const response = await axios.post('https://slack.com/api/conversations.list', {
//       types: 'public_channel,private_channel'
//     }, {
//       headers: {
//         'Authorization': `Bearer ${slackApiToken}`,
//         'Content-Type': 'application/json'
//       }
//     });

//     const data = response.data;

//     if (data.ok) {
//       const channels = data.channels;
//       console.log('All Slack Channels:');
//       channels.forEach((channel) => {
//         console.log(channel.name);
//       });
//     } else {
//       console.error('Failed to get channels:', data.error);
//     }
//   } catch (error) {
//     console.error('Error getting channels:', error);
//   }
// }

// getAllChannels();







//++++++++++++++++++++++++++
//הוספת user ל- channel
// const axios = require('axios');

// const slackApiToken = 'xoxe.xoxp-1-Mi0yLTU2MDk1MTEzNDIxNjMtNTYwOTY2OTQ0NDE3OS01NTk1NjA3NDgyMDA3LTU2MjMwNjA4NDk2MzUtMzljYWVlNTAzMzZjNGEzNjVjNmM4YTZlNTY1YjY2NTJmYmY5YjNmMzFmYzA0NDkwOTNiYzk2OTA3MjY4MDkwNw';
// const channelId = 'CHANNEL_ID'; // Replace with the channel ID you want to add users to
// const userIds = ['U05HSM3PJHL']; // Replace with an array of user IDs to invite

// async function inviteUsersToChannel(channelId, userIds) {
//   try {
//     const response = await axios.post('https://slack.com/api/conversations.invite', {
//       channel: channelId,
//       users: userIds.join(',')
//     }, {
//       headers: {
//         'Authorization': `Bearer ${slackApiToken}`,
//         'Content-Type': 'application/json'
//       }
//     });

//     const data = response.data;

//     if (data.ok) {
//       console.log('Users invited successfully!');
//     } else {
//       console.error('Failed to invite users:', data.error);
//     }
//   } catch (error) {
//     console.error('Error inviting users:', error);
//   }
// }

// inviteUsersToChannel(channelId, userIds);




//+++++++++++++++++++++++++++++++++++++++++++++++
//שליחת הודעה למשתתפי ה - channel

// async function sendMessagesToChannelMembers(channelId, message) {
//   try {
//     const response = await axios.get(`https://slack.com/api/conversations.members?channel=${channelId}`, {
//       headers: {
//         'Authorization': `Bearer ${slackApiToken}`
//       }
//     });

//     const data = response.data;

//     if (data.ok) {
//       const members = data.members;

//       for (const memberId of members) {
//         await sendMessageToChannel(memberId, message);
//       }

//       console.log('Messages sent to all channel members successfully!');
//     } else {
//       console.error('Failed to fetch channel members:', data.error);
//     }
//   } catch (error) {
//     console.error('Error sending messages to channel members:', error);
//   }
// }

// async function main() {
//   const channelName = 'channel_6';
//   const userIds = ['U05HSM3PJHL']; // Add more user IDs to the array if needed
//   const channelId = await createNewChannel(channelName, userIds);

//   if (channelId) {
//     const message = 'Hello, this is a test message from the webhook!';
//     await sendMessagesToChannelMembers(channelId, message);
//   } else {
//     console.log('Channel creation failed. Cannot send messages.');
//   }
// }

// main();
//+++++++++++++++++++++++++++++++
////מחיקת channels
////לא עובד-מחקנו מהממשק
// const axios = require('axios');

// const slackApiToken = 'xoxb-5609511342163-5604717800598-XAxj3F4jbNGLav6i5DkQZkJw';


// async function deleteChannels(channelIds) {
//   try {
//     const promises = channelIds.map(async (channelId) => {
//       const response = await axios.post('https://slack.com/api/conversations.delete', {
//         channel: channelId,
//       }, {
//         headers: {
//           'Authorization': `Bearer ${slackApiToken}`,
//           'Content-Type': 'application/json'
//         }
//       });

//       const data = response.data;

//       if (data.ok) {
//         console.log(`Channel ${channelId} deleted successfully!`);
//       } else {
//         console.error(`Failed to delete channel ${channelId}:`, data.error);
//       }
//     });

//     await Promise.all(promises);
//   } catch (error) {
//     console.error('Error deleting channels:', error);
//   }
// }

// async function main() {
//   const channelIdsToDelete = ['C05K0TT95GQ', 'C05JB4G2119','C05J4JUPM70','C05J4JQRFF0']; // Replace with the channel IDs you want to delete
//   await deleteChannels(channelIdsToDelete);
// }

// main();

//+++++++++++++++++++++++++++++++++++
////קבלת רשימת ה - channels + channelId
// const axios = require('axios');

// const slackApiToken = 'xoxe.xoxp-1-Mi0yLTU2MDk1MTEzNDIxNjMtNTYwOTY2OTQ0NDE3OS01NTk1NjA3NDgyMDA3LTU2MjMwNjA4NDk2MzUtMzljYWVlNTAzMzZjNGEzNjVjNmM4YTZlNTY1YjY2NTJmYmY5YjNmMzFmYzA0NDkwOTNiYzk2OTA3MjY4MDkwNw';

// async function getChannels() {
//   try {
//     const response = await axios.get('https://slack.com/api/conversations.list', {
//       params: {
//         types: 'public_channel,private_channel',
//       },
//       headers: {
//         'Authorization': `Bearer ${slackApiToken}`,
//       },
//     });

//     const data = response.data;

//     if (data.ok) {
//       const channels = data.channels;
//       console.log('Slack Channels:');
//       channels.forEach((channel) => {
//         console.log(`${channel.name} (${channel.id})`);
//       });
//     } else {
//       console.error('Failed to fetch channels:', data.error);
//     }
//   } catch (error) {
//     console.error('Error fetching channels:', error);
//   }
// }

// async function main() {
//   await getChannels();
// }

// main();




//++++++++++++++++
//קבלת כל היוזרים
// const axios = require('axios');
// const slackApiToken = 'xoxe.xoxp-1-Mi0yLTU2MDk1MTEzNDIxNjMtNTYwOTY2OTQ0NDE3OS01NTk1NjA3NDgyMDA3LTU2MjMwNjA4NDk2MzUtMzljYWVlNTAzMzZjNGEzNjVjNmM4YTZlNTY1YjY2NTJmYmY5YjNmMzFmYzA0NDkwOTNiYzk2OTA3MjY4MDkwNw';
// async function getSlackUsers() {
//   try {
//     const response = await axios.get('https://slack.com/api/users.list', {
//       headers: {
//         Authorization: `Bearer ${slackApiToken}`,
//       },
//     });
//     const data = response.data;
//     if (data.ok) {
//       return data.members;
//     } else {
//       console.error(`Failed to fetch users: ${data.error}`);
//       return [];
//     }
//   } catch (error) {
//     console.error('Error fetching users:', error);
//     return [];
//   }
// }
// async function main() {
//     const users = await getSlackUsers();
//     console.log('Slack Users:');
//     users.forEach((user) => {
//       console.log(`${user.profile.real_name} (${user.id})`);
//     });
//   }
//   main();

//++++++++++++++++++++++++++++++++
//שליחת הודעה למשתמש מסוים


// const axios = require('axios');

// // The Slack webhook URL
// const webhookUrl = 'https://hooks.slack.com/services/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';

// // Function to send a message to Slack
// async function sendMessageToSlack(message, userId) {
//   try {
//     await axios.post(webhookUrl, {
//       text: message,
//       channel: userId // Specify the user ID here to send the message to a specific user
//     });
//     console.log('Message sent to Slack successfully!');
//   } catch (error) {
//     console.error('Error sending message to Slack:', error.message);
//   }
// }

// // Send a test message to Slack user with ID "U05HXKPD259"
// sendMessageToSlack('This is a test ❤️!!!!!!!!', 'U05HXKPD259');
//+++++++



//פתיחת צאנל+צירוף משתמש+ שליחת הודעה למשתמש




const slackApiToken = 'xoxb-5609511342163-5604717800598-XAxj3F4jbNGLav6i5DkQZkJw';

async function createNewChannel(channelName, userIds) {
  try {
    const response = await axios.post('https://slack.com/api/conversations.create', {
      name: channelName,
      is_private: false, 
      user_ids: userIds 
    }, {
      headers: {
        'Authorization': `Bearer ${slackApiToken}`,
        'Content-Type': 'application/json'
      }
    });

    const data = response.data;

    if (data.ok) {
      console.log('New public channel created:', data.channel.name);
      const channelId = data.channel.id;

      await sendJoinMessageToUser(channelId, userIds);

      return channelId; 
    } else {
      console.error('Failed to create channel:', data.error);
      return null;
    }
  } catch (error) {
    console.error('Error creating channel:', error);
    return null;
  }
}


const webhookUrl = 'https://hooks.slack.com/services/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';

const axios = require('axios');
async function sendJoinMessageToUser(channelId, userId) {
    try {
        await axios.post(webhookUrl, {
            text: `You have been invited to join the channel. Click the link to join: https://slack.com/app_redirect?channel=${channelId}`,
            channel: userId 
        });
    } catch (error) {
        console.error(`Error sending join invitation to user ${userId}:`, error);
    }
}


async function sendMessageToChannel(channelId, message) {
  try {
    const response = await axios.post('https://slack.com/api/chat.postMessage', {
      channel: channelId,
      text: message
    }, {
      headers: {
        'Authorization': `Bearer ${slackApiToken}`,
        'Content-Type': 'application/json'
      }
    });

    const data = response.data;

    if (data.ok) {
      console.log('Message sent to Slack successfully!');
      return data.ts; 
    } else {
      console.error('Error sending message to Slack:', data.error);
      return null;
    }
  } catch (error) {
    console.error('Error sending message to Slack:', error);
    return null;
  }
}

async function main() {
  const channelName = 'channel_25';

  //Todo- change the userIds list
  const userIds = ['U05HXKPD259'];
  const channelId = await createNewChannel(channelName, userIds);

  if (channelId) {
    const message = 'Hello, this is a test message from the webhook! Welcome to the channel.';
    const messageTimestamp = await sendMessageToChannel(channelId, message);
  } else {
    console.log('Channel creation failed. Cannot send message.');
  }
}

main();
