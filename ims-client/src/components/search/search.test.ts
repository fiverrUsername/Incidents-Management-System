import { fireEvent, render, screen } from '@testing-library/react';

describe('Search',()=>{
    test('Search component should handle click event', () => {
    
        // Mock the onEvent and setValue functions
        const mockOnEvent = jest.fn();
        const mockSetValue = jest.fn();
      
        // Render the Search component
      
        // Find the search input
        const searchInput = screen.getByPlaceholderText('Search...');
      
        // Simulate a change event on the search input
        fireEvent.change(searchInput, { target: { value: 'test' } });
      
        // Expect the setValue function to be called with the correct value
        expect(mockSetValue).toHaveBeenCalledWith('test');
      
        // Simulate a keydown event with the Enter key
        fireEvent.keyDown(searchInput, { key: 'Enter' });
      
        // Expect the onEvent function to be called with the correct argument
        expect(mockOnEvent).toHaveBeenCalledWith('someFunction');
      
      })
})
