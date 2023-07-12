import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Types } from './Types';
interface Props{
    type:string;
    setType: React.Dispatch<React.SetStateAction<string>>
}
export default function DropDown({type,setType}:Props) {

    const handleChange = (event: SelectChangeEvent) => {
        setType(event.target.value);
    };

    return (
        <FormControl>
            <InputLabel id="demo-simple-select-label">Select type</InputLabel>
            <Select
                labelId="demo-simple-select-placeholder-label"
                id="demo-simple-select-placeholder"
                value={type}
                onChange={handleChange}
                displayEmpty
            >
                <MenuItem value="">
                </MenuItem>
                {Types.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
            <FormHelperText></FormHelperText>
        </FormControl>
    );
}




