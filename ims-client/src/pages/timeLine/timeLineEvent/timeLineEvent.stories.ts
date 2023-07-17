import type { Meta, StoryObj } from '@storybook/react';

import TimeLineEvent from './timeLineEvent'
const meta = {
    title: 'Components/TimeLineEvent',
    component: TimeLineEvent,
    tags: ['autodocs'],
    parameters: {
        layout: 'mobile',
    },
};
export const Default = {
    args: {
        timeline: {
            profile: 'https://mui.com/static/images/avatar/1-sm.jpeg',
            name: "John",
            date: new Date(),
            description: "", 
            priority: "P0"
        }
    }
    //
};
export default meta;
type Story = StoryObj<typeof meta>;