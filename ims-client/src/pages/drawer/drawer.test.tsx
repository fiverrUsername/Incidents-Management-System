import React from 'react';
import { render } from '@testing-library/react';
import Drawer from './drawer';

jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}));

test('renders Drawer component', () => {
  const icons = [
    {
      text: 'Inbox',
      icon: () => <div>Inbox Icon</div>,
      navigation: '/inbox',
    },
    {
      text: 'Mail',
      icon: () => <div>Mail Icon</div>,
      navigation: '/mail',
    },
  ];

  const { getByText } = render(<Drawer icons={icons} />);
  const inboxIcon = getByText('Inbox Icon');
  const mailIcon = getByText('Mail Icon');

  expect(inboxIcon).toBeInTheDocument();
  expect(mailIcon).toBeInTheDocument();
});


