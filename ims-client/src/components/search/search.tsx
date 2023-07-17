import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import FilterListIcon from '@mui/icons-material/FilterList';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import * as React from 'react';
import { EventProps } from '../incidentTable/incidentTable';



const Search: React.FC<EventProps> = ({ onEvent, setValue }) => {
    const handleClick = () => {
        onEvent('someFunction');
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleClick();
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
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleClick}>
            <SearchIcon />
            </IconButton>
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search..."
                inputProps={{ 'aria-label': 'search incident' }}
                onKeyDown={handleKeyDown}
                onChange={handleChange}
            />
          <FilterListIcon sx={{ opacity: "20%" }}></FilterListIcon>
        </Paper>
    );
};

export default Search;
