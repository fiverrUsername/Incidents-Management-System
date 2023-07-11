import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

interface getAllProps {
    value: dayjs.Dayjs | null,
    setValue: React.Dispatch<React.SetStateAction<dayjs.Dayjs | null>>

}
//m d y=the format
export default function DateTimePickerValue({ value, setValue }: getAllProps) {
    // const [value, setValue] = React.useState<Dayjs | null>(dayjs().set('year', dayjs().year()-1));
    // console.log(value?.format())
    const lastYear = dayjs().set('year', dayjs().year() - 1)
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
                <DateTimePicker
                    value={value}
                    onChange={(newValue) => setValue(newValue)}
                    disableFuture//אין אפשרות לבחור בתאריך שעדיין לא היה
                    minDate={lastYear}
                    label="dateTimePicker"
                />
            </DemoContainer>
        </LocalizationProvider>
    );
}