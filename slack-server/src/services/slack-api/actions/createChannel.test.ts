// // import { InvitePeopleToChannel } from './InvitePeopleToChannel';
// // import { createNewChannel } from './createChannel';
// // import { updateChannelDescription } from './updateChannelDescription';
// // import { sendMassageOnChangePriority } from './sendMassageOnChangePriority';
// // import { sendToSocket } from '../../socket';
// // import { client } from './const';
// // import { Priority } from '../../../../../ims-server/src/enums/enum';

// // jest.mock('./InvitePeopleToChannel');
// // jest.mock('./updateChannelDescription');
// // jest.mock('./sendMassageOnChangePriority');
// // jest.mock('../../socket');

// // describe('createNewChannel function', () => {
// //     const incidentData = {
// //         "name": "y19",
// //         "status": "Active",
// //         "description": "d",
// //         "currentPriority": Priority.P1 ,
// //         "type": "technical",
// //         "durationHours": 0,
// //         "channelId": "",
// //         "channelName": "y19",
// //         "slackLink": "",
// //         "date": "2023-07-25T13:46:53.690Z",
// //         "createdAt": "2023-07-25T13:46:53.690Z",
// //         "updatedAt": "2023-07-25T13:46:53.690Z",
// //         "cost": 0,
// //         "createdBy": "?",
// //         "currentTags": [],
// //     };


// //     it('should create a new channel and perform necessary actions', async () => {
// //         // Mock the return values of the mocked functions
// //         const mockChannelId = 'C05JZP6D47R';
// //         const mockUpdatedDescription = incidentData.description;
// //         const mockUsers = ['U05HXKPD259'];
// //         // Mock InvitePeopleToChannel
// //         InvitePeopleToChannel(mockChannelId, mockUsers); // No need for /* Mock implementation */

// //         // Mock updateChannelDescription
// //         updateChannelDescription(mockChannelId, mockUpdatedDescription);

// //         // Mock sendMassageOnChangePriority
// //         sendMassageOnChangePriority(mockChannelId, incidentData.currentPriority); // No need for /* Mock implementation */

// //         // Mock sendToSocket
// //         // sendToSocket.mockResolvedValue(); // No need for /* Mock implementation */

// //         // Mock the API response from conversations.create
// //         client.conversations.create = jest.fn().mockResolvedValue({
// //             ok: true,
// //             channel: { id: mockChannelId },
// //         });

// //         const result = await createNewChannel(incidentData);

// //         expect(result).toBe(mockChannelId);
// //         expect(client.conversations.create).toHaveBeenCalledWith({
// //             name: 'test channel',
// //             user_ids: ['U05HXKPD259'],
// //             is_private: false,
// //         });
// //         expect(InvitePeopleToChannel).toHaveBeenCalledWith(mockChannelId, ['U05HXKPD259']);
// //         expect(updateChannelDescription).toHaveBeenCalledWith(mockChannelId, incidentData.description);
// //         expect(sendMassageOnChangePriority).toHaveBeenCalledWith(mockChannelId, incidentData.currentPriority);
// //         expect(sendToSocket).toHaveBeenCalledWith(incidentData, expect.anything(), expect.anything());
// //     });

// //     //TODO
// //     //More tests    
// // });

const { InvitePeopleToChannel } = require('./InvitePeopleToChannel');
const { createNewChannel } = require('./createChannel');
const { updateChannelDescription } = require('./updateChannelDescription');
const { sendMassageOnChangePriority } = require('./sendMassageOnChangePriority');
const { sendToSocket } = require('../../socket');
const { client } = require('./const');
const { Priority } = require('../../../../../ims-server/src/enums/enum');

jest.mock('./InvitePeopleToChannel');
jest.mock('./updateChannelDescription');
jest.mock('./sendMassageOnChangePriority');
jest.mock('../../socket');

describe('createNewChannel function', () => {
    const incidentData = {
        "name": "y19",
        "status": "Active",
        "description": "d",
        "currentPriority": Priority.P1 ,
        "type": "technical",
        "durationHours": 0,
        "channelId": "",
        "channelName": "y19",
        "slackLink": "",
        "date": "2023-07-25T13:46:53.690Z",
        "createdAt": "2023-07-25T13:46:53.690Z",
        "updatedAt": "2023-07-25T13:46:53.690Z",
        "cost": 0,
        "createdBy": "?",
        "currentTags": [],
    };


    it('should create a new channel and perform necessary actions', async () => {
        // Mock the return values of the mocked functions
        const mockChannelId = 'C05JZP6D47R';
        const mockUpdatedDescription = incidentData.description;
        const mockUsers = ['U05HXKPD259'];
        // Mock InvitePeopleToChannel
        InvitePeopleToChannel(mockChannelId, mockUsers); // No need for /* Mock implementation */

        // Mock updateChannelDescription
        updateChannelDescription(mockChannelId, mockUpdatedDescription);

        // Mock sendMassageOnChangePriority
        sendMassageOnChangePriority(mockChannelId, incidentData.currentPriority); // No need for /* Mock implementation */

        // Mock sendToSocket
        // sendToSocket.mockResolvedValue(); // No need for /* Mock implementation */

        // Mock the API response from conversations.create
        client.conversations.create = jest.fn().mockResolvedValue({
            ok: true,
            channel: { id: mockChannelId },
        });

        const result = await createNewChannel(incidentData);

        expect(result).toBe(mockChannelId);
        expect(client.conversations.create).toHaveBeenCalledWith({
            name: 'test channel',
            user_ids: ['U05HXKPD259'],
            is_private: false,
        });
        expect(InvitePeopleToChannel).toHaveBeenCalledWith(mockChannelId, ['U05HXKPD259']);
        expect(updateChannelDescription).toHaveBeenCalledWith(mockChannelId, incidentData.description);
        expect(sendMassageOnChangePriority).toHaveBeenCalledWith(mockChannelId, incidentData.currentPriority);
        expect(sendToSocket).toHaveBeenCalledWith(incidentData, expect.anything(), expect.anything());
    });

    //TODO
    //More tests    
});

