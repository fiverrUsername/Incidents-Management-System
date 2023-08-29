import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import UpTabs from './Tabs';

const meta = {
    title: 'Components/UpTabs',
    component: UpTabs,
    tags: ['autodocs'],
    argTypes: {

    },
  } satisfies Meta<typeof UpTabs>;
  
  export default meta;
  type Story = StoryObj<typeof meta>;
  
  // More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
  export const def: Story = {
    args: {
    
    },
  };
  