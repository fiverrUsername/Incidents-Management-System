import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import FilterListIcon from '@mui/icons-material/FilterList';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import * as React from 'react';
import { IEventFilterProps } from '../../interface/IEventFilterProps';

const Search: React.FC<IEventFilterProps> = ({ setValue }) => {

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    return (
        <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
        >
            <IconButton type="button" sx={{ p: '10px', color: "#7F8085" }} aria-label="search" >
                <SearchIcon />
            </IconButton>
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search..."
                inputProps={{ 'aria-label': 'search incident' }}
                onKeyDown={handleKeyDown}
                onChange={handleChange}
            />
            <FilterListIcon sx={{ color: "rgba(127, 128, 133, 0.15)" }}></FilterListIcon>
        </Paper>
    );
};

export default Search;
