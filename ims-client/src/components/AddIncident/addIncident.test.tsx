// import React from 'react';
// import { render, screen, fireEvent } from '@testing-library/react';
// import AddIncident from './AddIncident';

// describe('AddIncident component', () => {
//   const onCloseMock = jest.fn();

//   beforeEach(() => {
//     onCloseMock.mockClear();
//   });

//   test('renders Add Incident title', () => {
//     render(<AddIncident open={true} onClose={onCloseMock} />);
//     const titleElement = screen.getByText(/Add Incident/i);
//     expect(titleElement).toBeInTheDocument();
//   });

//   test('renders the form fields', () => {
//     render(<AddIncident open={true} onClose={onCloseMock} />);
//     const nameField = screen.getByLabelText(/Incident Name/i);
//     const descriptionField = screen.getByLabelText(/Description/i);
//     const priorityField = screen.getByLabelText(/Priority/i);
//     const dateField = screen.getByLabelText(/Date \(optional\)/i);
//     const slackLinkField = screen.getByLabelText(/Channel Link/i);
//     const typeField = screen.getByLabelText(/Type/i);
//     const tagsField = screen.getByLabelText(/Tags/i);
//     const addButton = screen.getByText(/Add/i);

//     expect(nameField).toBeInTheDocument();
//     expect(descriptionField).toBeInTheDocument();
//     expect(priorityField).toBeInTheDocument();
//     expect(dateField).toBeInTheDocument();
//     expect(slackLinkField).toBeInTheDocument();
//     expect(typeField).toBeInTheDocument();
//     expect(tagsField).toBeInTheDocument();
//     expect(addButton).toBeInTheDocument();
//   });

//   test('calls onClose function when close icon is clicked', () => {
//     render(<AddIncident open={true} onClose={onCloseMock} />);
//     const closeIcon = screen.getByLabelText(/Close/i);
//     fireEvent.click(closeIcon);
//     expect(onCloseMock).toHaveBeenCalledTimes(1);
//   });

//   test('calls onSubmit function when the form is submitted', () => {
//     render(<AddIncident open={true} onClose={onCloseMock} />);
//     const addButton = screen.getByText(/Add/i);

//     // Simulate form data
//     const nameInput = screen.getByLabelText(/Incident Name/i);
//     fireEvent.change(nameInput, { target: { value: 'Test Incident' } });

//     const descriptionInput = screen.getByLabelText(/Description/i);
//     fireEvent.change(descriptionInput, { target: { value: 'Test description' } });

//     const priorityInput = screen.getByLabelText(/Priority/i);
//     fireEvent.click(priorityInput);

//     // ... Simulate filling in other form fields ...

//     // Submit the form
//     fireEvent.click(addButton);

//     // Check if the onSubmit function is called with the correct form data
//     expect(onCloseMock).toHaveBeenCalledTimes(1);
//   });
// });
export{}






