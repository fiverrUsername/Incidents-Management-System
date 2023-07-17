import React from 'react';

import axios, { AxiosResponse } from 'axios';
import WidgetsStack from './WidgetsStack';
import { act, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
jest.mock('axios');
describe('WidgetsStack', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  test('should render widgets with correct data', async () => {
    const mAxiosResponse = {
      data: {  activeCount: 10,averageCost: 50,averageDurationHours: 2},
    } as AxiosResponse;
    jest.spyOn(axios, 'get').mockResolvedValueOnce(mAxiosResponse);
    render(<WidgetsStack />);
    expect(screen.getByText('Active Count')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('Average Cost')).toBeInTheDocument();
    expect(screen.getByText('50')).toBeInTheDocument();
    expect(screen.getByText('Average Duration Hours')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });
});



