import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';  
 
import { ISummary } from '../../interface/ISummary';
import theme from '../../theme';
import dayjs from 'dayjs';
import DisplaySummary from './displaySummary';
 

describe('DisplaySummary', () => {
  // Mock the summaryIncident prop for testing
  const mockSummary:ISummary = {
      createdAt: new Date("2023-01-05T08:00:00"),
      createdBy: 'John Doe',
      currentPriority: 'p3',
      tags: []
  };

  test('renders summary details correctly', () => {
    // Render the component with the mock data
    const { getByText } = render(<DisplaySummary summaryIncident={mockSummary} ></DisplaySummary>);
   
    // Assert that the expected content is present in the component
    expect(getByText('Created by:')).toBeInTheDocument();
    expect(getByText('Created by:')).toHaveStyle(`color:${theme.palette.primary.dark};font-size:${theme.typography.fontSize}`);
    expect(getByText(`Created by:${mockSummary.createdBy}`)).toBeInTheDocument();

    const formattedDate = dayjs(mockSummary.createdAt).format('DD/MM/YYYY');
    expect(getByText('Created at:')).toBeInTheDocument();
    expect(getByText('Created at:')).toHaveStyle(`color:${theme.palette.primary.dark};font-size:${theme.typography.fontSize}`);
    expect(getByText(`Created at: ${formattedDate}`)).toBeInTheDocument();

    expect(getByText('Current priority:')).toBeInTheDocument();
    expect(getByText('Current priority:')).toHaveStyle(`color:${theme.palette.primary.dark};font-size:${theme.typography.fontSize}`);
    expect(getByText(`Current priority: ${mockSummary.currentPriority}`)).toBeInTheDocument();

    expect(getByText('Affected services:')).toBeInTheDocument();
  });
});