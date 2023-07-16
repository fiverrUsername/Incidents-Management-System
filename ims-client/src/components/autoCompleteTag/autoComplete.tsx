import React, { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Option from '../../interface/IOption';
import theme from '../../theme';

interface AutocompleteProps {
  options: Option[];
}

const CustomAutocomplete =({ options }: AutocompleteProps) => {
  const [selectedOptions, setSelectedOptions] = useState<Option []>([]);
  return (
    <Autocomplete
      ChipProps={{
        clickable: true,
        sx: {
          border: '1px solid'+theme.palette.secondary.main,
          color: theme.palette.secondary.main,
          backgroundColor: theme.palette.secondary.light,
          fontFamily: theme.typography.fontFamily,
          fontSize: theme.typography.fontSize,
          fontStyle: theme.typography.normal.fontStyle,
          fontWeight:  theme.typography.normal.fontWeight,
          lineHeight:  theme.typography.bold.lineHeight,
        },
      }}
      multiple
      options={options}
      filterSelectedOptions
      value={selectedOptions}
      getOptionLabel={(option) => option.value}
      onChange={(event, newValue) => {
        setSelectedOptions(newValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Write to add"
        />
      )}
      sx={{border:"1px solid #E1E1E1",borderRadius:"10px",background:theme.palette.primary.contrastText,width: "569px"}}
    />
  );
};
export default CustomAutocomplete;