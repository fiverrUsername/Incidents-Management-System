
import React, { ChangeEvent } from 'react';
import { Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { styled } from '@mui/system';
import { Status } from '../../interface/enums';

const CustomSelect = styled(Select)({
  color: '#7F8085',
  fontFamily: 'Poppins',
  fontSize: '15px',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: 'normal',
  display: 'flex',
  flexDirection: 'column',
  flex: '1 0 0',
});

interface StatusOption {
  value: Status;
  label: string;
}

export const Statuses: StatusOption[] = [
  { value: Status.Active, label: 'Active' },
  { value: Status.Resolved, label: 'Resolved' },
];

interface StatusProps {
  value: Status;
  onChange: (value: Status) => void;
}

const StatusSelect: React.FC<StatusProps> = ({ value, onChange }) => {
  const handleChange = (event: ChangeEvent<{ value: unknown }>) => {
    onChange(event.target.value as Status);
  };

  return (
    <CustomSelect value={value} onChange={handleChange as (event: SelectChangeEvent<unknown>) => void}>
      {Statuses.map((status: StatusOption) => (
        <MenuItem key={status.value} value={status.value}>
          {status.label}
        </MenuItem>
      ))}
    </CustomSelect>
  );
};

export default StatusSelect;


