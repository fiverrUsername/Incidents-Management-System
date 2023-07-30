import React, { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Option from '../../interface/IOption';
import theme from '../../theme';
import { IntervalHistogram } from 'perf_hooks';
import  IOption  from '../../interface/IOption';


interface AutocompleteProps {
  options: any[];
  selectedOptions: any[];
  setSelectedOptions: React.Dispatch<React.SetStateAction<any[]>>;
  getOptionLabel: (option: any) => string;
  disabled?:boolean
  placehOlderText:string
}
const CustomAutocomplete=({ options, selectedOptions, setSelectedOptions,getOptionLabel,disabled,placehOlderText }: AutocompleteProps) => {
  const filteredOptions = options.filter(
    (option) => !selectedOptions.some((selected) => selected.value === getOptionLabel(option))
  );

  const readOnlyAttribute = disabled ? { readOnly: true } : {readOnly: false};

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
      options={filteredOptions} // Use the filtered options
      filterSelectedOptions
      value={selectedOptions}
      getOptionLabel={getOptionLabel}
      onChange={(event, newValue) => {
      setSelectedOptions(newValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={placehOlderText}
        
        />
      )}
      sx={{ border: "1px solid #E1E1E1", borderRadius: "10px", background: theme.palette.primary.contrastText, width: "100%" }}
      {...readOnlyAttribute}
      freeSolo
    />
  );
};

export default CustomAutocomplete;
