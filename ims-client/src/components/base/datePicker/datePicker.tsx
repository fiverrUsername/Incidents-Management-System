
import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

interface DateTimePickerProps {
  date: Dayjs | null;
  setDate: React.Dispatch<React.SetStateAction<Dayjs | null>>;
}

export default function DatePicker({ date, setDate }: DateTimePickerProps) {
  const lastYear = dayjs().set('year', dayjs().year() - 1);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
        <div style={{ height: '80px', overflow: 'hidden' }}>
          <DateTimePicker
            value={date}
            onChange={(newdate) => setDate(newdate)}
            disableFuture
            minDate={lastYear}
            label="Select Date"
          />
        </div>
      </DemoContainer>
    </LocalizationProvider>
  );
}
