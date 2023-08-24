import FormData from 'form-data';
import { SLACK_UPLOAD_FILES, client, SLACK_API_TOKEN, SLACK_TOKEN } from '../../constPage';
import axios from "axios";
import { IAttachmentData } from '../../interfaces/attachmentData';
import { IMessageData } from '../../interfaces/messageData';
import fs from 'fs';

export async function sendMessage(messageData: IMessageData) {
  try {
    const message = (messageData.userName ? `name: <@${messageData.userName}>\n` : '') + (messageData.text ? messageData.text : '');
    const postMessageResponse = await client.chat.postMessage({
      channel: messageData.channelId,
      text: message,
      as_user: true,
      username: messageData.userName,
    });

    if (messageData.files && messageData.files.length > 0) {
      const fileUploads = await Promise.all(
        messageData.files.map(async (file: IAttachmentData) => {
          try {
            const response = await axios.get(file.url.toString(), { responseType: 'arraybuffer' });
            const fileData = response.data;
        
            const tempFilePath = `./temp-file`;
            fs.writeFileSync(tempFilePath, fileData);
        
            const result = await client.files.upload({
              channels: messageData.channelId,
              file: fs.createReadStream(tempFilePath),
              filename: file.key.substring(file.key.lastIndexOf('?')+1)
            });
            fs.unlinkSync(tempFilePath);
          } catch (error) {
            console.error('Error sending file:', error);
          }
        })
      );
    }
    console.log('Message sent successfully!');
  } catch (error) {
    console.error('Error sending message:', error);
  }
}
