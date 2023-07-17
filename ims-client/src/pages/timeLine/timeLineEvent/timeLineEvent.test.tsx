import { render } from '@testing-library/react';
import TimelineEvent from './timeLineEvent';

describe('TimelineEvent Component', () => {
    const sampleTimeline = {
        id: '123',
        incidentId: '1',
        profile: 'avatar.jpg',
        name: 'John Doe',
        createdDate: new Date('2023-07-01').toString(),
        description: 'Lorem ipsum dolor sit amet',
        priority: 'high',
    };//
//     test('should render the timeline event with correct data', () => {
//         const { getByText, getByAltText } = render(<TimelineEvent timeline={sampleTimeline} />);
//         const nameElement = getByText('John Doe');
//         const dateElement = getByText('Fri Jul 01 2023');
//         const descriptionElement = getByText('Lorem ipsum dolor sit amet');
//         const avatarImage = getByAltText('Profile Avatar');
//         expect(nameElement).toBeInTheDocument();
//         expect(dateElement).toBeInTheDocument();
//         expect(descriptionElement).toBeInTheDocument();
//         expect(avatarImage).toHaveAttribute('src', 'avatar.jpg');
//     });
// });
})