 import React from 'react';
 import { render, screen, fireEvent } from '@testing-library/react';
 import DropDown from './DropDown';
 import {Type} from './Types';

 describe('DropDown component', () => {
   it('renders the select box with options', () => {
     const Types1: Type[] = [
        { value: 'securing', label: 'a' },
        { value: 'technical', label: 'b' },
        { value: 'comment', label: 'c' },
    ];
    render(<DropDown arroption={Types1} />);
    
    });});


// //     const selectLabel = screen.getByLabelText('Select Type');
// //     expect(selectLabel).toBeInTheDocument();

// //     const defaultOptions = screen.queryAllByText(''); // Empty option
// //     expect(defaultOptions.length).toBe(1);

// //     const option1 = screen.getByText('securing');
// //     expect(option1).toBeInTheDocument();

// //     const option2 = screen.getByText('technical');
// //     expect(option2).toBeInTheDocument();

// //     const option3 = screen.getByText('comment');
// //     expect(option3).toBeInTheDocument();
// //   });

// //   test('updates the selected value on change', () => {
// //     render(<DropDown />);

// //     const selectBox = screen.getByLabelText('Select Type');

// //     fireEvent.change(selectBox, { target: { value: 'securing' } });
// //     expect(selectBox.value).toBe('securing');

// //     fireEvent.change(selectBox, { target: { value: 'technical' } });
// //     expect(selectBox.value).toBe('technical');

// //     fireEvent.change(selectBox, { target: { value: 'comment' } });
// //     expect(selectBox.value).toBe('comment');
// //   }
// // );
// // });
// import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import DropDown from './DropDown';

// describe('DropDown Component', () => {
//   it('should render with the correct options', () => {
//     render(<DropDown />);
    
//     const selectElement = screen.getByLabelText('Type');

//     expect(selectElement).toBeInTheDocument();

//     userEvent.click(selectElement);

//     const securingOption = screen.getByText('securing');
//     const technicalOption = screen.getByText('technical');
//     const commentOption = screen.getByText('comment');

//     expect(securingOption).toBeInTheDocument();
//     expect(technicalOption).toBeInTheDocument();
//     expect(commentOption).toBeInTheDocument();
//   });

//   it('should update the selected value when an option is selected', () => {
//     render(<DropDown />);
    
//     const selectElement = screen.getByLabelText('Type');

//     userEvent.selectOptions(selectElement, 'securing');

//     expect(selectElement.value).toBe('securing');

//   });


