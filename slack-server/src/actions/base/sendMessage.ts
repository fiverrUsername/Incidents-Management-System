import FormData from 'form-data';
import { SLACK_UPLOAD_FILES, client, SLACK_API_TOKEN } from '../../constPage';
import axios from "axios";
import { IAttachmentData } from '../../interfaces/attachmentData';
import { IMessageData } from '../../interfaces/messageData';

export async function sendMessage(messageData: IMessageData) {
  try {
    const massage = (messageData.userName ? "name: <@" + messageData.userName+" \n": "") + (messageData.text ? messageData.text : "")
    await client.chat.postMessage({
      channel: messageData.channelId,
      text: massage,
      as_user: true,
      username: messageData.userName,
    });
    if (messageData.files !== null) {
      const fileUploads = messageData.files?.map(async (file: string) => {
        try {
          const formData = new FormData();
          formData.append('channels', messageData.channelId);
          formData.append('file', Buffer.from(file), {
            filename: "test"
          });
          await axios.post(SLACK_UPLOAD_FILES, formData, {
            headers: {
              ...formData.getHeaders(),
              Authorization: `Bearer ${SLACK_API_TOKEN}`
            },
          });

        } catch (error) {
          console.error('Error uploading file:', error);
          return null;
        }
      });
      await Promise.all(fileUploads ? fileUploads : "");
    }
    console.log('Message and files sent successfully!');
  } catch (error) {
    console.error('Error sending message:', error);
  }
}
