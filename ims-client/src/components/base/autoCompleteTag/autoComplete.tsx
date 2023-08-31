import React,{ SyntheticEvent, useState, useEffect } from 'react';
import Autocomplete, { AutocompleteRenderInputParams } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import theme from '../../../theme';
import { ITag } from '../../../interfaces/ITag';

interface AutocompleteProps {
  options: ITag[];
  selectedOptions?: (string|ITag)[];
  onChangeOptions: (event: CustomSyntheticEvent) => void;
  getOptionLabel: (option: string|ITag) => string;
  placeholderText: string;
  disable?: boolean
}
export interface CustomSyntheticEvent extends SyntheticEvent {
  selectedTags: (string|ITag)[];
}
const CustomAutocomplete = (props: AutocompleteProps) => {
  const [value, setValue] = useState(props.selectedOptions || []);
  const [readOnly, setReadOnly] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState<ITag[]>(props.options);

  useEffect(() => {
    if (props.disable) { setReadOnly(true) }
    if (props.selectedOptions) {
      const selectedValues = props.selectedOptions.map((selected) => props.getOptionLabel(selected));
      const newFilteredOptions = props.options.filter(
        (option) => !selectedValues.includes(props.getOptionLabel(option))
      );

      if (newFilteredOptions.length > 0) {
        setFilteredOptions(newFilteredOptions);
      }
    }
    else {
      setFilteredOptions(props.options);
    }
  }, [props.selectedOptions, props.options]);

  const handleChange = (event: SyntheticEvent, newValue: (ITag|string)[]) => {
    const newFilteredOptions = filteredOptions.filter(
      (option:ITag) => !newValue.includes(option)
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
      multiple
      options={filteredOptions}
      value={value}
      getOptionLabel={props.getOptionLabel}
      onChange={handleChange}
      renderInput={(params:AutocompleteRenderInputParams) => (
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