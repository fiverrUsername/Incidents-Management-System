import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { LocalizationProvider } from '@mui/lab';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

interface getAllProps {
    date: dayjs.Dayjs | null,
    setDate: React.Dispatch<React.SetStateAction<dayjs.Dayjs | null>>

}
//m d y=the format
export default function DateTimePickerValue({ date, setDate }: getAllProps) {
    // const [date, setDate] = React.useState<Dayjs | null>(dayjs().set('year', dayjs().year()-1));
    // console.log(date?.format())
    const lastYear = dayjs().set('year', dayjs().year() - 1)
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            {/* <DemoContainer components={['DateTimePicker', 'DateTimePicker']}> */}
                <DateTimePicker
                    value={date}
                    onChange={(newValue) => setDate(newValue)}
                    disableFuture//אין אפשרות לבחור בתאריך שעדיין לא היה
                    minDate={lastYear}
                   
                />
            {/* </DemoContainer> */}
        </LocalizationProvider>
    );
}