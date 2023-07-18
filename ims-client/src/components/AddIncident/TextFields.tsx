// import { styled } from '@mui/system';
// import { TextField } from '@mui/material';
// import { Theme } from '@mui/material/styles';

// interface TextFieldProps {
//   size: 'small' | 'medium' | 'large';
// }

// const TextFieldInput = styled(TextField)<TextFieldProps>(({ size }) => ({
//   '& .MuiInputBase-root': {
//     margin: '10px 10px 10px 18px',
//     height: size === 'small' ? '56px' : size === 'medium' ? '100px' : '150px',
//     padding: '16px 20px',
//     display: 'flex',
//     alignItems: 'flex-start',
//     gap: '16px',
//     alignSelf: 'stretch',


//   },
//   '& input::-webkit-inner-spin-button, & input::-webkit-outer-spin-button': {
//     margin: 0,
//   },
//   '& input[type=number]': {
//     '-moz-appearance': 'textfield',
//   },
// }));

// export default TextFieldInput;



import styled from 'styled-components';
import TextField from '@mui/material/TextField';

interface TextFieldProps {
  size: 'small' | 'medium' | 'large';
}

const TextFieldInput = styled(TextField)<TextFieldProps>(({ size }) => ({
  '& .MuiInputBase-root': {
    margin: '10px 10px 10px 0px',
    padding: '16px 20px',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '16px',
    alignSelf: 'stretch',
  },
  '& input::-webkit-inner-spin-button, & input::-webkit-outer-spin-button': {
    margin: 0,
  },
  '& input[type=number]': {
    '-moz-appearance': 'textfield',
  },
  '& .MuiInputBase-input': {
    maxHeight: '100%',
    overflowY: 'auto',
  },
}));

export default TextFieldInput;
