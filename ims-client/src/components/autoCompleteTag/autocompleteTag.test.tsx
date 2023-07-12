// import React from 'react';
// import { render, fireEvent } from '@testing-library/react';
// import AutocompleteTag from './autoCompleteTag';

// // Mock tag options
// const mockTagOptions = [
//   { id: '1', name: 'Tag1' },
//   { id: '2', name: 'Tag2' },
//   { id: '3', name: 'Tag3' },
// ];

// test('AutocompleteTag renders correctly and handles tag selection and removal', () => {
//  // Render the component
//   const { getByPlaceholderText, getByText, queryByTestId } = render(
//     <AutocompleteTag tagOptions={mockTagOptions}  selectedTags={selectedTags} setSelectedTags={setSelectedTags}/>
//   );

//   // Find the input field
//   const input = getByPlaceholderText('Write to add');

//   // Simulate typing and selecting a tag
//   fireEvent.change(input, { target: { value: 'Tag1' } });
//   fireEvent.keyDown(input, { key: 'Enter' });

//   // Check if the selected tag is displayed
//   const selectedTag = getByText('Tag1');
//   expect(selectedTag).toBeInTheDocument();

//   // Simulate selecting another tag
//   fireEvent.change(input, { target: { value: 'Tag2' } });
//   fireEvent.keyDown(input, { key: 'Enter' });

//   // Check if the second selected tag is displayed
//   const secondSelectedTag = getByText('Tag2');
//   expect(secondSelectedTag).toBeInTheDocument();

//   // Simulate removing a selected tag
//   fireEvent.click(selectedTag);

//   // Check if the selected tag is removed from the list of options
//   const removedTagOption = queryByTestId('option-Tag1');
//   expect(removedTagOption).toBeNull();

//   // Simulate removing the second selected tag
//   fireEvent.click(secondSelectedTag);

//   // Check if the second selected tag is removed from the list of options
//   const removedSecondTagOption = queryByTestId('option-Tag2');
//   expect(removedSecondTagOption).toBeNull();

// });

export{}