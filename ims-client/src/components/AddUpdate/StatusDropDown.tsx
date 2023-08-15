import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Statuses } from './Status';
import { useForm } from 'react-hook-form';
import { dataFromForm } from './UpdateIncident';
import { Status } from '../../interface/enums';

interface Props {
    status: Status;
    setStatus: React.Dispatch<React.SetStateAction<Status>>
}
export default function DropDown({ status, setStatus }: Props) {
    const handleChange = (event: SelectChangeEvent) => {
        setStatus(event.target.value as Status);
    };
    const { handleSubmit, register, formState: { errors } } = useForm<dataFromForm>();

    return (
        <FormControl>
            <Select
                placeholder="Select Status"
                labelId="demo-simple-select-placeholder-label"
                id="demo-simple-select-placeholder"
                value={status}
                onChange={handleChange}
                displayEmpty
            >
                <MenuItem disabled value="">
                    <div>Select Status</div>
                </MenuItem>
                {Statuses.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}




