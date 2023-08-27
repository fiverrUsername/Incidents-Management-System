import React from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';  
 
import { ISummary } from '../../../interfaces/ISummary';
import theme from '../../../theme';
import dayjs from 'dayjs';
import DisplaySummary from './displaySummary';
import { Priority } from '../../../interfaces/enums'; 

const mockSummary:ISummary = {
  createdBy: 'John Doe',
  createdAt: new Date("2023-01-05T08:00:00"),
  currentPriority: Priority.P0,
  tags: [{id:"aaa", name: 'Tag 1' }, { id:"bbb",name: 'Tag 2' }],
};

test('renders the DisplaySummary component with correct information',async  () => {
  const { getByText,queryByText  } = render(<DisplaySummary summaryIncident={mockSummary} />);


  await waitFor(() => {
  // Test if the component renders the creator's name correctly
  expect(queryByText(`Created by:${mockSummary.createdBy}`)).toBeInTheDocument();
  expect(queryByText ('Created by:')).toBeInTheDocument();
  expect(getByText('Created by:')).toHaveStyle(`color:${theme.palette.primary.dark};font-size:${theme.typography.fontSize}`);

  // Test if the component renders the created date correctly
  const formattedDate = dayjs(mockSummary.createdAt).format('DD/MM/YYYY');
  expect(getByText(`Created at: ${mockSummary.createdAt.toLocaleDateString('en-GB')}`)).toBeInTheDocument();
  expect(getByText('Created at:')).toHaveStyle(`color:${theme.palette.primary.dark};font-size:${theme.typography.fontSize}`);
  expect(getByText(`Created at: ${formattedDate}`)).toBeInTheDocument();

  // Test if the component renders the current priority correctly
  expect(getByText(`Current priority: ${mockSummary.currentPriority}`)).toBeInTheDocument();
  expect(getByText('Current priority:')).toHaveStyle(`color:${theme.palette.primary.dark};font-size:${theme.typography.fontSize}`);
  expect(getByText(`Current priority: ${mockSummary.currentPriority}`)).toBeInTheDocument();

  // Test if the component renders the tags correctly
  mockSummary.tags.forEach((tag) => {
    expect(getByText(tag.name)).toBeInTheDocument();
  })});
});

test('does not render the tags section when tags are empty', () => {
  // Create a mock summary with empty tags
  const mockSummaryWithNoTags = { ...mockSummary, tags: [] };

  const { queryByText } = render(<DisplaySummary summaryIncident={mockSummaryWithNoTags} />);

  // Test if the tags section is not rendered
  expect(queryByText('Affected services:')).toBeNull();
});