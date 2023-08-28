import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Search from './search';

const meta = {
    title: 'Components/Search',
    component: Search,
    tags: ['autodocs'],
    argTypes: {

    },
} satisfies Meta<typeof Search>;

export default meta;
type Story = StoryObj<typeof meta>;
  
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const def: Story = {
  args: {
    setValue: ()=>{console.log("jjj")}
  },
};

