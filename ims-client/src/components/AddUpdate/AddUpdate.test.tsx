// import React from 'react';
// import {render, screen, fireEvent  } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import AddUpdate, { form_data } from './AddUpdate';
// import apiCalls from '../../service/apiCalls';
// import IIncident from '../../interface/incidentInterface';

// fdescribe('AddUpdate Component', () => {
//  // const onCloseMock = jest.fn();
//   //const mockIncident= await apiCalls.getIncidentById("8");
//   it('renders the component with given incident data', () => {
//     const inc:IIncident={
//       "id": "123456",
//       "name": "Unresolved Incident2",
//       "status": "Active",
//       "description": "Issue Description",
//       "priority": "P3",
//       "type": "technical",
//       "durationHours": 24,
//       "channelId":"?",
//       "slackLink":"",
//       "channelName": "https://join.slack.com/t/fi-verr/shared_invite/zt-1xip09fur-ERWbAQen_A~dz5s42ltnvw",
//       "tags": [
//         {
//           "userId": "45sfeda992a5dd8bcf403m",
//           "name": "checkout"
//         }
//       ],
//       "date": new Date(),
//       "createdAt":new Date(),
//       "updatedAt": new Date(),
//       "cost": 900,
//       "createdBy":""
//     }
//     const f= () => {};
//     render(<AddUpdate open={true} onClose={f} incident={inc} />);

//   });
// });
//     // Assert that the component is rendered with the appropriate data
//     // expect(screen.getByText('Add Update')).toBeInTheDocument();
//     // expect(screen.getByLabelText('Text')).toBeInTheDocument();
//     // expect(screen.getByLabelText('Priority')).toBeInTheDocument();
//     // expect(screen.getByLabelText('Date (optional)')).toBeInTheDocument();
//     // expect(screen.getByLabelText('Type')).toBeInTheDocument();
//     // expect(screen.getByLabelText('Tags')).toBeInTheDocument();
//     // expect(screen.getByText('Update')).toBeInTheDocument();


// //   it('calls onClose when the close icon is clicked', () => {
// //     const incident = {
// //       priority: 'high',
// //       type: 'incident',
// //       tags: [{ id: 1, name: 'tag1' }, { id: 2, name: 'tag2' }],
// //     };

// //     render(
// //       <AddUpdate open={true} onClose={onCloseMock} incident={incident} />
// //     );

// //     // Simulate clicking on the close icon
// //     userEvent.click(screen.getByRole('button', { name: 'Close Icon' }));

// //     // Assert that the onClose function is called
// //     expect(onCloseMock).toHaveBeenCalledTimes(1);
// //   });

// //   it('submits the form with the correct data when the Update button is clicked', () => {
// //     const incident = {
// //       priority: 'high',
// //       type: 'incident',
// //       tags: [{ id: 1, name: 'tag1' }, { id: 2, name: 'tag2' }],
// //     };

// //     render(
// //       <AddUpdate open={true} onClose={onCloseMock} incident={incident} />
// //     );

// //     // Fill the form fields with some data
// //     userEvent.type(screen.getByLabelText('Text'), 'Sample text');
// //     userEvent.click(screen.getByLabelText('Priority'));
// //     userEvent.click(screen.getByText('High'));
// //     // Simulate selecting a date (if applicable)
// //     // userEvent.click(screen.getByLabelText('Date (optional)'));
// //     // userEvent.click(screen.getByText('Select'));
// //     // ... fill other form fields if needed ...

// //     // Simulate clicking the Update button
// //     userEvent.click(screen.getByText('Update'));

// //     // Assert that the form submission function is called with the correct data
// //     const expectedData: FormData = {
// //       text: 'Sample text',
// //       priority: 'high',
// //       date: null, // Set the expected date here if applicable
// //       type: 'incident',
// //       tags: [{ id: 1, name: 'tag1' }, { id: 2, name: 'tag2' }],
// //       files: [], // Set the expected files here if applicable
// //     };
// //     expect(submitTimeLine).toHaveBeenCalledWith({
// //       data: expectedData,
// //       incident,
// //     });

// //     // Assert that the banner notification is displayed
// //     expect(
// //       screen.getByText('new update Added Successfully')
// //     ).toBeInTheDocument();
// //   });
export{};