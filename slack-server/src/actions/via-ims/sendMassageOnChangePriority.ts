import { sendMessage } from '../base/sendMessage';
import { Priority } from '../../../../ims-server/src/enums/enum';

export async function sendMassageOnChangePriority(channelId: string, prod: Priority) {
  const prod_channel_id = prod === Priority.P0 ? 'C05JPSL5TCL' : prod === Priority.P1 ? 'C05JMDNMH1Q' : prod === Priority.P2 ? 'C05J6T6FKPH' : 'C05JJFQRQ05';
  sendMessage({ channelId: prod_channel_id, text: `Added a new incident in this priority. Click the link to watch: https://slack.com/app_redirect?channel=${channelId}` })
}