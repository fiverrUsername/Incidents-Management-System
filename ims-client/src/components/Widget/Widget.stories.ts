import type { Meta, StoryObj } from '@storybook/react';
import  Widget  from './Widget';
const meta = {
  title: 'Components/Widget',
  component: Widget,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};
export const Default = {
    args: {
        title: 'Test Task',
        aggregation: 962555
    }
  };
export default meta;
type Story = StoryObj<typeof meta>;