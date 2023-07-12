// interface Type {
//     value: string;
//     label: string;
// }

// export const Types: Type[] = [
//     { value: 'securing', label: 'securing' },
//     { value: 'technical', label: 'technical' },
//     { value: 'comment', label: 'comment' },
// ];


//+++++++++++++++++++++++++++++++++++++++++++++
import React, { ChangeEvent } from 'react';
import { Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { styled } from '@mui/system';

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

interface TypeOption {
  value: string;
  label: string;
}

export const Types: TypeOption[] = [
  { value: 'securing', label: 'securing' },
  { value: 'technical', label: 'technical' },
  { value: 'comment', label: 'comment' },
];

interface TypesProps {
  value: string;
  onChange: (value: string) => void;
}

const TypesSelect: React.FC<TypesProps> = ({ value, onChange }) => {
  const handleChange = (event: ChangeEvent<{ value: unknown }>) => {
    onChange(event.target.value as string);
  };

  return (
    <CustomSelect value={value} onChange={handleChange as (event: SelectChangeEvent<unknown>) => void}>
      {Types.map((type: TypeOption) => (
        <MenuItem key={type.value} value={type.value}>
          {type.label}
        </MenuItem>
      ))}
    </CustomSelect>
  );
};

export default TypesSelect;


