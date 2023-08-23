
// import * as React from 'react';
// import dayjs, { Dayjs } from 'dayjs';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

// interface DateTimePickerProps {
//   date: Dayjs | null;
//   setDate: React.Dispatch<React.SetStateAction<Dayjs | null>>;
// }

// export default function DateTimePickerdate({ date, setDate }: DateTimePickerProps) {
//   const lastYear = dayjs().set('year', dayjs().year() - 1);

//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
//         <div style={{ height: '80px', overflow: 'hidden' }}>
//           <DateTimePicker
//             value={date}
//             onChange={(newdate) => setDate(newdate)}
//             disableFuture
//             minDate={lastYear}
//             label="Select Date"
           
//           />
//         </div>
//       </DemoContainer>
//     </LocalizationProvider>
//   );
// }





// import React from 'react';
// import dayjs from 'dayjs';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

// export default function DateTimePickerdate() {
//   const lastYear = dayjs().set('year', dayjs().year() - 1);

//   const handleDateChange = (event: any) => {
//     //React.ChangeEvent<HTMLInputElement>
//     // You can access the event object here and extract any relevant data from it
//     console.log('Event:', event);
//   };

//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
//         <div style={{ height: '80px', overflow: 'hidden' }}>
//           <DateTimePicker
//             onChange={handleDateChange}
//             disableFuture
//             minDate={lastYear}
//             label="Select Date"
//           />
//         </div>
//       </DemoContainer>
//     </LocalizationProvider>
//   );
// }

// import React from 'react';
// import dayjs from 'dayjs';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

// interface DateTimePickerdateProps {
//   onChange: (event: React.ChangeEvent<HTMLInputElement> | null) => void;
// }

// export default function DateTimePickerdate({ onChange }: DateTimePickerdateProps) {
//   const lastYear = dayjs().set('year', dayjs().year() - 1);

//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
//         <div style={{ height: '80px', overflow: 'hidden' }}>
//           <DateTimePicker
//             value={null}
//             onChange={onChange}
//             disableFuture
//             minDate={lastYear}
//             label="Select Date"
//           />
//         </div>
//       </DemoContainer>
//     </LocalizationProvider>
//   );
// }
import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

interface DateTimePickerProps {
  date: Dayjs | null;
  onDateChange: (newDate: Dayjs | null) => void;
}

export default function DateTimePickerdate(props: DateTimePickerProps) {
  const lastYear = dayjs().set('year', dayjs().year() - 1);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
        <div style={{ height: '80px', overflow: 'hidden' }}>
          <DateTimePicker
            value={props.date}
            onChange={(newDate)=>props.onDateChange(newDate)}
            disableFuture
            minDate={lastYear}
            label="Select Date"
          />
        </div>
      </DemoContainer>
    </LocalizationProvider>
  );
}
