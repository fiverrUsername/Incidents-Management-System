import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AddUpdate from './AddUpdate';


describe('Tabs', () => {
    test('renders the component', () => {
      render(<AddUpdate open={true} onClose={jest.fn()} incident={jest.fn()} />);
    });
})




// describe('AddUpdate component', () => {
//     const onCloseMock = jest.fn();

//     beforeEach(() => {
//         onCloseMock.mockClear();
//     });

    //   test('renders Add Incident title', () => {
    //     render(<AddIncident open={true} onClose={onCloseMock} />);
    //     const titleElement = screen.getByText(/Add Incident/i);
    //     expect(titleElement).toBeInTheDocument();
    //   });
    

    // test('renders the form fields', async () => {
    //     const inc= await apiCalls.getIncidentById("106fb64d-81d2-4daa-9e95-b81ee4bd51d5");
    //     render(<AddUpdate open={true} onClose={onCloseMock} incident={inc} />);
    //     const textField = screen.getByLabelText(/Text/i);
        // const priorityField = screen.getByLabelText(/Priority/i);
        // const dateField = screen.getByLabelText(/Date \(optional\)/i);
        // const typeField = screen.getByLabelText(/Type/i);
        // const tagsField = screen.getByLabelText(/Tags/i);
        // const filesField = screen.getByText(/Files/i);
        // expect(textField).toBeInTheDocument();
        // expect(priorityField).toBeInTheDocument();
        // expect(dateField).toBeInTheDocument();
        // expect(typeField).toBeInTheDocument();
        // expect(tagsField).toBeInTheDocument();
        // expect(filesField).toBeInTheDocument();
    // });
// })
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
export { }






