import axios from '../../../axios';
import { Priority, Status,EncidentType } from '../../../../ims-server/src/enums/enum';
import { ActionType, ObjectType } from '../../../../ims-socket/src/interfaces';
import handleMessageEvent from './createTimeline';
import { sendToSocket } from '../../socket';
import { fileResponse } from './fileResponse';
import {date} from './createTimeline'


jest.mock('./fileResponse' );
jest.mock('../../socket' );
describe('createTimeline', () => {
  it('should create a timeline event', async () => {
    const event = {
      channel: 'C05M9FPQK9V', 
      text: 'Test incident',
      files: [], 
    };

    jest.mock('../base/decode/decodeMessagePriority', () => ({
      decodeMessagePriority: jest.fn(),
    }));

    const { decodeMessagePriority } = require('../base/decode/decodeMessagePriority');
    decodeMessagePriority.mockReturnValue( Priority.P0); // Adjust the value as needed

    jest.mock('../base/decode/decodeMessageDate', () => ({
      decodeMessageDate: jest.fn(),
    }));
    const { decodeMessageDate } = require('../base/decode/decodeMessageDate');
    decodeMessageDate.mockReturnValue(new Date()); // Adjust the value as needed

   await handleMessageEvent(event);

    expect(axios.get).toHaveBeenCalledWith('http://localhost:7000/incident/C05M9FPQK9V/channelId');
    expect(fileResponse).toHaveBeenCalledWith([], '06614a31-ce98-413b-a273-d31fe0f85d90')
    expect(sendToSocket).toHaveBeenCalledWith(
      {
        channelId: 'C05M9FPQK9V',
        incidentId: '06614a31-ce98-413b-a273-d31fe0f85d90',
        userId: '14785',
        description: 'Test incident',
        priority: Priority.P0,
        type: EncidentType.Securing, 
        files: [],
        createdDate: date,
        updatedDate: date,
        status: Status.Active,
      },
      ObjectType.TimelineEvent,
      ActionType.Add
    );
   });

 });
  
