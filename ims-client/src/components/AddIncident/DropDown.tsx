import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Types } from './Types';
import { useForm } from 'react-hook-form';
import { FormData } from './addIncident';

interface Props {
    type: string;
    setType: React.Dispatch<React.SetStateAction<string>>
}
export default function DropDown({ type, setType }: Props) {

    const handleChange = (event: SelectChangeEvent) => {
        setType(event.target.value);
    };
    const { handleSubmit, register, formState: { errors } } = useForm<FormData>();


    return (
        <FormControl>
            <Select

                // {...register("type", {
                //     required: "type is required",
                // })}
                placeholder="Select Type"
                labelId="demo-simple-select-placeholder-label"
                id="demo-simple-select-placeholder"
                value={type}
                onChange={handleChange}
                displayEmpty
            >
                <MenuItem disabled value="">
                    <div>Select Type</div>
                </MenuItem>
                {Types.map((option) => (
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




