import React, { SyntheticEvent, useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import theme from '../../../theme';
import { ITag } from '../../../interfaces/ITag';

interface AutocompleteProps {
  options: ITag[];
  selectedOptions?: ITag[];
  onChangeOptions: (event: CustomSyntheticEvent) => void;
  getOptionLabel: (option: any) => string;
  placeholderText: string;
  disable?:boolean
}
export interface CustomSyntheticEvent extends SyntheticEvent {
  selectedTags: ITag[];
}
const CustomAutocomplete = (props: AutocompleteProps) => {
  const [value, setValue] = useState<any[]>(props.selectedOptions || []);
  const [readOnly, setReadOnly] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState<ITag[]>(props.options);
  
  useEffect(() => {
    if(props.disable){setReadOnly(true)}
    if (props.selectedOptions) {
      const selectedValues = props.selectedOptions.map((selected) => props.getOptionLabel(selected));
      const newFilteredOptions = props.options.filter(
        (option) => !selectedValues.includes(props.getOptionLabel(option))
      );

      if (newFilteredOptions.length > 0) {
        setFilteredOptions(newFilteredOptions);
      }
    }
  }, [props.selectedOptions, props.options]);

  useEffect(() => {
    setFilteredOptions(props.options);
  }, []);

  const handleChange = (event: SyntheticEvent, newValue: any[]) => {
    const newFilteredOptions = filteredOptions.filter(
      (option) => !newValue.includes(option)
    );

    setFilteredOptions(newFilteredOptions);
    setValue(newValue);
    const customEvent: CustomSyntheticEvent = {
      ...event, 
      selectedTags: newValue,
    };
    props.onChangeOptions(customEvent);
  };

  return (
    <Autocomplete
      ChipProps={{
        clickable: true,
        sx: {
          border: `1px solid ${theme.palette.secondary.main}`,
          color: theme.palette.secondary.main,
          backgroundColor: theme.palette.secondary.light,
          fontFamily: theme.typography.fontFamily,
          fontSize: theme.typography.fontSize,
          fontStyle: theme.typography.normal.fontStyle,
          fontWeight: theme.typography.normal.fontWeight,
          lineHeight: theme.typography.bold.lineHeight,
        },
      }}
      //filterSelectedOptions
      multiple
      options={filteredOptions}
      value={value}
      getOptionLabel={props.getOptionLabel}
      onChange={handleChange}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={props.placeholderText}
        />
      )}
      sx={{
        border: "1px solid #E1E1E1",
        borderRadius: "10px",
        background: theme.palette.primary.contrastText,
        width: "100%",
      }}
      readOnly={readOnly}
      freeSolo
    />
  );
};

export default CustomAutocomplete;