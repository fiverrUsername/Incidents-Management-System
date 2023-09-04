import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

interface DateTimePickerProps {
    keyType:string;
    date: Dayjs | null;
    onDateChange: (keyType:string,newDate: Dayjs | null) => void;
}
export default function DateTimePickerValue(props: DateTimePickerProps) {
    const lastYear = dayjs().set('year', dayjs().year() - 1);

    const handleDateChange = (newDate: Dayjs | null) => {
        props.onDateChange(props.keyType,newDate);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
                <div style={{ height: '80px', overflow: 'hidden',padding:'1%' }}>
                    <DateTimePicker
                        value={props.date}
                        onChange={handleDateChange}
                        disableFuture
                        minDate={lastYear}
                        label="Select Date"
                    />
                </div>
            </DemoContainer>
        </LocalizationProvider>
    );
}
