


import { render, screen } from '@testing-library/react';
import React from 'react'; 
import BannerNotification from './BannerNotification';

test('should render BannerNotification with given message and severity', () => {
  const message = 'This is a test message';
  const severity = 'success';
  render(<BannerNotification message={message} severity={severity} />);
  const alertElement = screen.getByRole('alert');
  expect(alertElement).toBeInTheDocument();
  expect(alertElement).toHaveTextContent(message);
});


 
  