import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import StatusSelect, { Statuses } from './Status';
import { useForm } from 'react-hook-form';
import { form_data } from './UpdateIncident';
import { Status } from '../../interface/enums';

interface Props {
    status: Status;
    setStatus: React.Dispatch<React.SetStateAction<Status>>
}
export default function DropDown({ status, setStatus }: Props) {

    const handleChange = (event: SelectChangeEvent) => {
        setStatus(event.target.value as Status);
    };
    const { handleSubmit, register, formState: { errors } } = useForm<form_data>();


    return (
        <FormControl>
            <Select

                // {...register("type", {
                //     required: "type is required",
                // })}
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

            <FormHelperText></FormHelperText>
            {/* {errors.type && <span>{errors.type.message}</span>} */}
        </FormControl>
    );
}




