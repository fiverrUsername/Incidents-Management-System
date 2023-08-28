import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CustomAutocomplete from './autoComplete';


// // Mock tag options
// const mockOptions = [
//   { key: '1', value: 'Option1' },
//   { key: '2', value: 'Option2' },
//   { key: '3', value: 'Option3' },
// ];

// test('CustomAutocomplete renders correctly and handles option selection and removal', () => {
//   // Render the component
//   // const { getByPlaceholderText, getByText, queryByTestId } = render(
//   //   <CustomAutocomplete options={mockOptions} />
//   // );

//   // Find the input field
//   const input = getByPlaceholderText('Write to add');

//   // Simulate typing and selecting a tag
//   fireEvent.change(input, { target: { value: 'Option1' } });
//   fireEvent.keyDown(input, { key: 'Enter' });

//   // Check if the selected tag is displayed
//   const selectedOption = getByText('Option1');
//   expect(selectedOption).toBeInTheDocument();

//   // Simulate selecting another tag
//   fireEvent.change(input, { target: { value: 'Option2' } });
//   fireEvent.keyDown(input, { key: 'Enter' });

//   // Check if the second selected tag is displayed
//   const secondSelectedOption = getByText('Option2');
//   expect(secondSelectedOption).toBeInTheDocument();

//   // Simulate removing a selected tag
//   fireEvent.click(selectedOption);

//   // Check if the selected tag is removed from the list of options
//   const removedTagOption = queryByTestId('option-Option1');
//   expect(removedTagOption).toBeNull();

//   // Simulate removing the second selected tag
//   fireEvent.click(secondSelectedOption);

//   // Check if the second selected tag is removed from the list of options
//   const removedSecondOption = queryByTestId('option-Option2');
//   expect(removedSecondOption).toBeNull();

// });

export{}