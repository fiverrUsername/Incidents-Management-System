import type { Meta, StoryObj } from '@storybook/react';
import CustomAutocomplete from './autoComplete';
const meta = {
    title: 'Components/CustomAutocomplete',
    component: CustomAutocomplete,
    tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};
export const Default = {
    args: {
        options:[{key:"a" ,value:"Option1"}, {key:"b" ,value:"Option2"}, {key:"c" ,value:"Option3"}, {key:"d" ,value:"Option4"}]
    }
  };
export default meta;
type Story = StoryObj<typeof meta>;

