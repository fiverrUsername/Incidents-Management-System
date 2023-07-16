import React from 'react';
import { render, screen } from '@testing-library/react';
import Widget from './Widget';

describe('Widget', () => {
  it('renders the component with correct props', () => {
    const title = 'Test Widget';
    const aggregation = 123456;
    const icon = <svg data-testid="test-icon" />;

    render(<Widget title={title} aggregation={aggregation} icon={icon} />);

    // Assert the title is rendered correctly
    expect(screen.getByText(title)).toBeInTheDocument();

    // Assert the aggregation is rendered correctly
    const formattedAggregation = aggregation.toLocaleString();
    expect(screen.getByText(formattedAggregation)).toBeInTheDocument();

    // Assert the icon is rendered correctly
    const iconElement = screen.getByTestId('test-icon');
    expect(iconElement).toBeInTheDocument();
   
  });

  
});