import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Type } from './Types';

interface DropDownprps{
arroption:Type[]
}

export default function DropDown(prop:DropDownprps) {
  const [type, setType] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value);
  };

  return (
    <div>
      <FormControl
        sx={{
          position: 'absolute',
          top: '50%',
          right: '50%',
          transform: 'translateY(-50%)',
          minWidth: 200,
        }}
      >
        <InputLabel id="demo-simple-select-helper-label">Select Type</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={type}
          label="Type"
          onChange={handleChange}
        >
            <MenuItem value="">
          </MenuItem>
          {prop.arroption.map((option:any) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText></FormHelperText>
      </FormControl>
    </div>
  );
}