const axios = require('axios');

const slackApiToken = 'xoxe.xoxp-1-Mi0yLTU2MDk1MTEzNDIxNjMtNTYwOTY2OTQ0NDE3OS01NTk1NjA3NDgyMDA3LTU2ODIyNTc2NTA4MDEtNDNmYjFjOTBmNDQyYzI0NTY4NTMwYzFmNjAzNmYxYTVhODA0YTE0MzM3ZmJlZDM4OGEwZDVhODc5YTIwMDJkNg';

async function getAllChannels() {
  try {
    const response = await axios.post('https://slack.com/api/conversations.list', {
      types: 'public_channel,private_channel'
    }, {
      headers: {
        'Authorization': `Bearer ${slackApiToken}`,
        'Content-Type': 'application/json'
      }
    });

    const data = response.data;

    if (data.ok) {
      const channels = data.channels;
      console.log('All Slack Channels:');
      channels.forEach((channel:any) => {
        console.log(channel.name , "   ",channel.id);
      });
    } else {
      console.error('Failed to get channels:', data.error);
    }
  } catch (error) {
    console.error('Error getting channels:', error);
  }
}

// getAllChannels();
