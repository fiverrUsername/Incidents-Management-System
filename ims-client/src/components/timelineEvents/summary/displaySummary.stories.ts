import type { Meta, StoryObj } from '@storybook/react';
import DisplaySummary from './displaySummary';
import { ITag } from '../../../interfaces/ITag';

const meta = {
    title: 'Components/DisplaySummary',
    component: DisplaySummary,
    tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};
export const Default = {
    args: {
        summaryIncident: {
          createdBy: 'John Doe',
          createdAt: '2023-07-25T12:34:56Z',
          currentPriority: 'High',
          tags: [
            { id: '1', name: 'Tag 1' },
            { id: '2', name: 'Tag 2' },
            // Add more tags if needed...
          ],
        },
        options: [
          { id: 'a', name: 'Option1' },
          { id: 'b', name: 'Option2' },
          { id: 'c', name: 'Option3' },
          { id: 'd', name: 'Option4' },
        ] as ITag[],
      },
  };
export default meta;
type Story = StoryObj<typeof meta>;


