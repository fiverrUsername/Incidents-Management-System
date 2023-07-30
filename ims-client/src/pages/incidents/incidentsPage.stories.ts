import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import UpTabs from '../../components/tabs/Tabs';
import incidentsPage from './incidentsPage';

const meta = {
  title: 'components/incidentsPage',
  component: incidentsPage,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
    tags: ['autodocs'],
  },
} satisfies Meta<typeof incidentsPage>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Filter: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const activeIncidents = await canvas.getByText('Active Incidents');
    await userEvent.click(activeIncidents);
    const SolvedIncidents = await canvas.getByText('Solved Incidents');
    await userEvent.click(SolvedIncidents);
  },
};


