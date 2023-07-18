
// import React, { useState } from 'react';
// import Autocomplete from '@mui/material/Autocomplete';
// import TextField from '@mui/material/TextField';
// import Option from '../../interface/IOption';
// import theme from '../../theme';
// import { IntervalHistogram } from 'perf_hooks';

// // interface AutocompleteProps {
// //   options: Option[];
// //   selectedTags: Option[];
// //   setSelectedTags: React.Dispatch<React.SetStateAction<Option[]>>;
// // }
// interface AutocompleteProps {
//   options: ITag[];
//   selectedTags: ITag[];
//   setSelectedTags: React.Dispatch<React.SetStateAction<IntervalHistogram[]>>;
// }
// const CustomAutocomplete = ({ options, selectedTags, setSelectedTags }: AutocompleteProps) => {
//   const filteredOptions = options.filter((option) => !selectedTags.some((selectedTag) => selectedTag.key === option.key));

//   return (
//     <Autocomplete
//       ChipProps={{
//         clickable: true,
//         sx: {
//           border: '1px solid' + theme.palette.secondary.main,
//           color: theme.palette.secondary.main,
//           backgroundColor: theme.palette.secondary.light,
//           fontFamily: theme.typography.fontFamily,
//           fontSize: theme.typography.fontSize,
//           fontStyle: theme.typography.normal.fontStyle,
//           fontWeight: theme.typography.normal.fontWeight,
//           lineHeight: theme.typography.normal.lineHeight,
//         },
//       }}
//       multiple
//       options={filteredOptions} // Use the filtered options
//       filterSelectedOptions
//       value={selectedTags}
//       getOptionLabel={(option) => option.value}
//       onChange={(event, newValue) => {
//         setSelectedTags(newValue);
//       }}
//       renderInput={(params) => (
//         <TextField
//           {...params}
//           placeholder="Write to add"
//         />
//       )}
//       sx={{ border: "1px solid #E1E1E1", borderRadius: "10px", background: theme.palette.primary.contrastText, width: "100%" }}
//     />
//   );
// };

// export default CustomAutocomplete;
//++++++++++++++++++++++++++++


import React, { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Option from '../../interface/IOption';
import theme from '../../theme';
import { IntervalHistogram } from 'perf_hooks';
import { ITag } from '../../interface/ITag';


interface AutocompleteProps {
  options: ITag[];
  selectedTags: ITag[];
  setSelectedTags: React.Dispatch<React.SetStateAction<ITag[]>>;
}
const CustomAutocomplete = ({ options, selectedTags, setSelectedTags }: AutocompleteProps) => {
  const filteredOptions = options.filter((option) => !selectedTags.some((selectedTag) => selectedTag.userId === option.name));

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
      value={selectedTags}
      getOptionLabel={(option) => option.name}
      onChange={(event, newValue) => {
        setSelectedTags(newValue);
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
