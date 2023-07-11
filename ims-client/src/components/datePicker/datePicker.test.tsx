import { render } from '@testing-library/react';
import DateTimePickerValue from './datePicker';
import React from 'react';
import dayjs, { Dayjs } from 'dayjs';


const [value, setValue] = React.useState<Dayjs | null>(dayjs().set('year', dayjs().year() - 1));
test('renders MyComponent', () => {
    render(<DateTimePickerValue value={value} setValue={setValue} />);
    // Assertion or further testing code
});


