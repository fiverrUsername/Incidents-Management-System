import { render } from '@testing-library/react';
import { Priority } from '../../../interface/enum-priority';
import TimelineEvent from './timeLineEvent';

describe('TimelineEvent Component', () => {
    const sampleTimeline = {
        incidentId: "649cbeda942a5d4d8bcf303b",
        userId: "698cbeda854a5d4d8bcf303l",
        description: "Finding conflicts.",
        priority: Priority.P0,
        type: "",
        files: [
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB9hfMxrD1ywcTDkrqvYu2CPDaDifO3AtmLztsKh4ZqkvS1jZdEQ1DWupA9KJCrQ-wnZI&usqp=CAU",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB9hfMxrD1ywcTDkrqvYu2CPDaDifO3AtmLztsKh4ZqkvS1jZdEQ1DWupA9KJCrQ-wnZI&usqp=CAU",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB9hfMxrD1ywcTDkrqvYu2CPDaDifO3AtmLztsKh4ZqkvS1jZdEQ1DWupA9KJCrQ-wnZI&usqp=CAU"
        ],
        tags: [

        ],
        createdDate: "2023-07-01T10:30:00Z",
        updatedDate: "2023-07-01T10:30:00Z",
    };

    test('should render the timeline event with correct data', () => {
        // const { getByText, getByAltText } = render(<TimelineEvent timeline={sampleTimeline} isPriorityChanged={true} isTypeChanged={false} previosPriority={"p1"} previousType={""}
        //     name={"John Smith"}
        //     profile={"https://meshek8.co.il/wp-content/uploads/2021/02/%D7%A6%D7%99%D7%9C%D7%95%D7%9D_%D7%A4%D7%A8%D7%95%D7%A4%D7%99%D7%9C_1.jpg"} />);

        // const nameElement = getByText('John Smith');
        // const dateElement = getByText('01/07/2023');
        // const descriptionElement = getByText('Finding conflicts.');
        // expect(nameElement).toBeInTheDocument();
        // expect(dateElement).toBeInTheDocument();
        // expect(descriptionElement).toBeInTheDocument();

    });
});
