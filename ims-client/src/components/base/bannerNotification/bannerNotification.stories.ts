import { Meta, StoryObj } from '@storybook/react';
import { within, userEvent, waitForElementToBeRemoved } from '@storybook/testing-library';
import BannerNotification from './BannerNotification';
  
const meta =  {
  title: 'Components/BannerNotification',
  component: BannerNotification,
  argTypes: {
    message: {
      control: 'text',
      defaultValue: 'This is a notification message',
    },
    severity: {
      control: {
        type: 'select',
        options: ['error', 'warning', 'info', 'success'],
      },
      defaultValue: 'info',
    },
    onClose: {
      action: 'onClose',
    },
  },
}satisfies Meta<typeof BannerNotification>;
​
export default meta;
type Story = StoryObj<typeof meta>;
​
export const Error: Story = {
    args: {
        message:"error message",
        severity:"error"
    },
  };
  export const Info: Story = {
    args: {
        message:"info message",
        severity:"info"
    },
  };
  export const Success: Story = {
    args: {
        message:"success message",
        severity:"success"
    },
  };
  export const Warning: Story = {
    args: {
        message:"warning message",
        severity:"warning"
    },
  };
​
​
  export const CustomInteraction: Story = {
    args: {
      message: 'This is a notification message',
      severity: 'info',
      onClose: undefined,
    },
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      const handleClose = () => {
        console.log('Notification closed!');
      };
      const notification = await canvas.findByRole('alert');
      await userEvent.click(notification);
  
      const observer = new MutationObserver(() => {
        const isVisible = getComputedStyle(notification).visibility === 'visible';
        if (!isVisible) {
          handleClose();
          observer.disconnect();
        }
      });
      observer.observe(notification, { attributes: true });
    },
  };