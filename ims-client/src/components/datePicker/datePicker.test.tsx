import { render } from '@testing-library/react';
import DateTimePickerValue from './datePicker';
import React from 'react';
import dayjs, { Dayjs } from 'dayjs';


const [date, setDate] = React.useState<Dayjs | null>(dayjs().set('year', dayjs().year() - 1));
test('renders MyComponent', () => {
    render(<DateTimePickerValue date={date} setDate={setDate} />);
    // Assertion or further testing code
});
