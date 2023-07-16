import type { StoryObj } from '@storybook/react';
import IncidentTable from './incidentTable';

const meta = {
    title: 'Components/IncidentTable',
    component: IncidentTable,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
    },
};
export const Default = {
    args: {
        rows:[]
    }
};
export default meta;
type Story = StoryObj<typeof meta>;