import React, { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import theme from '../../theme';


interface AutocompleteProps {
  options: any[];
   selectedOptions: any[];
   setSelectedOptions: React.Dispatch<React.SetStateAction<any[]>>;
  getOptionLabel: (option: any) => string;
}
const CustomAutocomplete=({ options,
   selectedOptions,
   setSelectedOptions,
  getOptionLabel }: AutocompleteProps) => {
  const selectedValues = selectedOptions.map((selected) => getOptionLabel(selected));
  const filteredOptions = options.filter(
    (option) => !selectedValues.includes(getOptionLabel(option))
  );
  return (
    <Autocomplete
      ChipProps={{
        clickable: true,
        sx: {
          border: '1px solid' + theme.palette.secondary.main,
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
      options={filteredOptions} 
      filterSelectedOptions
      value={selectedOptions}
      getOptionLabel={getOptionLabel}
      onChange={(event, newValue) => {
      setSelectedOptions(newValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Write to add"
        />
      )}
      sx={{ border: "1px solid #E1E1E1", borderRadius: "10px", background: theme.palette.primary.contrastText, width: "100%" }}
    />
  );
};

export default CustomAutocomplete;
