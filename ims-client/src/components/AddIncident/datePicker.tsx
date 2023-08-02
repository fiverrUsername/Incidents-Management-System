import * as React from 'react';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/lab';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

interface getAllProps {
    date: dayjs.Dayjs | null,
    setDate: React.Dispatch<React.SetStateAction<dayjs.Dayjs | null>>

}
export default function DateTimePickerValue({ date, setDate }: getAllProps) {
    const lastYear = dayjs().set('year', dayjs().year() - 1)
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                    value={date}
                    onChange={(newValue) => setDate(newValue)}
                    disableFuture  //It is not possible to choose a date that hasn't happened yet
                    minDate={lastYear}    
                />
        </LocalizationProvider>
    );
}