import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { option } from './Types';

interface DropDownProps {
    keyType: string,
    defaultValue?: string;
    Types: option[];
    onChangeType: (keyType: string, event: any) => void;
}
export default function DropDown(props: DropDownProps) {
    const [type, setType] = React.useState(props.defaultValue);
    const handleChange = (event: SelectChangeEvent) => {
        setType(event.target.value);
        props.onChangeType(props.keyType, event.target.value)
    };
    return (
        <FormControl>
            <Select
                labelId="demo-simple-select-placeholder-label"
                id="demo-simple-select-placeholder"
                value={type}
                onChange={handleChange}
                displayEmpty
            >
                <MenuItem disabled value="">
                    <div>Select {props.keyType} </div>
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















