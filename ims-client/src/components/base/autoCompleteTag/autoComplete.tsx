import React, { SyntheticEvent, useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import theme from '../../../theme';
import { ITag } from '../../../interfaces/ITag';
interface AutocompleteProps {
  keytype:string;
  options: ITag[];
  selectedOptions?: ITag[];
  onChangeOptions: (keytype:string,event: any) => void;
}
export interface CustomSyntheticEvent extends SyntheticEvent {
  selectedTags: ITag[];
}
const CustomAutocomplete = (props: AutocompleteProps) => {

  const [value, setValue] = useState<ITag[]>(props.selectedOptions || []);
  const [filteredOptions, setFilteredOptions] = useState<ITag[]>(props.options);
  useEffect(() => {
    if (props.selectedOptions) {
      const selectedValues = props.selectedOptions.map((selected) => selected.name);
      const newFilteredOptions = props.options.filter(
        (option) => !selectedValues.includes(option.name)
      );
      if (newFilteredOptions.length > 0) {
        setFilteredOptions(newFilteredOptions);
      }
    }
    else{
      setFilteredOptions(props.options);
    }
  }, [props.selectedOptions, props.options]);
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
    props.onChangeOptions(props.keytype, customEvent.selectedTags);
  };
 // eslint-disable-next-line @typescript-eslint/no-explicit-any
 const getOptionLabel= (option: any) => option.name;
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
      multiple
      options={filteredOptions}
      value={value}
      getOptionLabel={getOptionLabel}
      onChange={handleChange}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Write to add"
        />
      )}
      sx={{
        border: "1px solid #E1E1E1",
        borderRadius: "10px",
        background: theme.palette.primary.contrastText,
        width: "100%",
      }}
      freeSolo
    />
  );
};
export default CustomAutocomplete;