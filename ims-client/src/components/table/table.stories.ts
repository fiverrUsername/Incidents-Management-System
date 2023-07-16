import type { Meta, StoryObj } from '@storybook/react';
import Table from './table';

const meta = {
    title: 'Components/Table',
    component: Table,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
    },
};
export const Default = {
    args: {
        columns: [],
        rows: []
    }
};
export default meta;
type Story = StoryObj<typeof meta>;