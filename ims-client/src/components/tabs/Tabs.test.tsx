import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Tabs from './Tabs';
import theme from '../../theme';

describe('Tabs', () => {
    test('renders the component', () => {
        render(<Tabs setValue={jest.fn()} />);
    });

    test('changes the active tab on click', () => {
        const { getByText } = render(<Tabs setValue={jest.fn()} />);
        const activeTab = getByText('Active Incidents');
        const solvedTab = getByText('Solved Incidents');

        fireEvent.click(solvedTab);

        expect(solvedTab).toHaveStyle(`backgroundColor: ${theme.palette.secondary.main}`);
        expect(activeTab).not.toHaveStyle(`backgroundColor: ${theme.palette.secondary.main}`);
    });

    test('calls the onEvent function with the correct value when the tab changes', () => {
        const mockOnEvent = jest.fn();
        const { getByText } = render(<Tabs setValue={jest.fn()} />);
        const activeTab = getByText('Active Incidents');
        const solvedTab = getByText('Solved Incidents');

        fireEvent.click(solvedTab);

        expect(mockOnEvent).toHaveBeenCalledTimes(1);
        expect(mockOnEvent).toHaveBeenCalledWith('someFunction');

        fireEvent.click(activeTab);

        expect(mockOnEvent).toHaveBeenCalledTimes(2);
        expect(mockOnEvent).toHaveBeenCalledWith('someFunction');
    });
});
