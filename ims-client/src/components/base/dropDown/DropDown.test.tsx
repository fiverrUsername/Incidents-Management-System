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

