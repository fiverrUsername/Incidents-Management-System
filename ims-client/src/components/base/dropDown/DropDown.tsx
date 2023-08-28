
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useForm } from 'react-hook-form';
import { option } from './Types';

interface DropDownProps {
  defaultValue?:string;
  Types:option[];
  onChangeType: (event: SelectChangeEvent) => void;
}
export default function DropDown(props:DropDownProps) {
  const [type, setType] = React.useState(props.defaultValue);
  const handleChange = (event: SelectChangeEvent) => {
        setType(event.target.value);
        props.onChangeType(event)
      };
    return (
        <FormControl>
            <Select
                placeholder="Select"
                labelId="demo-simple-select-placeholder-label"
                id="demo-simple-select-placeholder"
                value={type}
                defaultValue={props.defaultValue}
                onChange={handleChange}
                displayEmpty
            >
                <MenuItem disabled value="">
                </MenuItem>
                {props.Types.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>

            <FormHelperText></FormHelperText>
        </FormControl>
    );
}















