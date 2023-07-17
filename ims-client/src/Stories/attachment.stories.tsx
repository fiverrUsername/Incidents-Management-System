import React from 'react';
import { Meta, Story } from '@storybook/react';
import Attachment, { AttachmentProps } from '../pages/timeLine/timeLineEvent/attachment/attachment';

export default {
  component: Attachment,
  title: 'Components/Attachment',
  argTypes: {
    attachmentFile: { control: 'text' },
    numberOfImages: { control: 'text' },
  },

decorators: [
  (Story) => (
    <div style={{ padding: '20px', background: '#f0f0f0' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <Story />
      </div>
    </div>
  ),
],
} as Meta;

// const Template: Story<AttachmentProps> = (args) => <Attachment {...args} />;


// export const SingleImageSize = Template.bind({});
// SingleImageSize.args = {
//   attachmentFile: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB9hfMxrD1ywcTDkrqvYu2CPDaDifO3AtmLztsKh4ZqkvS1jZdEQ1DWupA9KJCrQ-wnZI&usqp=CAU"
//   ,
//   numberOfImages: 'singleImage',
// };

// export const TwoImagesSize = Template.bind({});
// TwoImagesSize.args = {
//   attachmentFile: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB9hfMxrD1ywcTDkrqvYu2CPDaDifO3AtmLztsKh4ZqkvS1jZdEQ1DWupA9KJCrQ-wnZI&usqp=CAU"
//   ,
//   numberOfImages: 'twoImages',
// };

// export const ThreeOrMoreImagesSize= Template.bind({});
// ThreeOrMoreImagesSize.args = {
//   attachmentFile: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB9hfMxrD1ywcTDkrqvYu2CPDaDifO3AtmLztsKh4ZqkvS1jZdEQ1DWupA9KJCrQ-wnZI&usqp=CAU"
//   ,
//   numberOfImages: 'threeAndMoreImages',
// };


