import { styled } from '@mui/system';
import { TextField } from '@mui/material';
import { Theme } from '@mui/material/styles';

interface CustomTextFieldProps {
  theme: Theme;
}

const CustomTextField = styled(TextField)<CustomTextFieldProps>(({ theme }) => ({
  '& .MuiInputBase-root': {
    margin: '10px 10px 10px 18px',
    height: '50px',
    width: '150px',
    borderRadius: '8px',
    borderColer: '',
  },
  '& input::-webkit-inner-spin-button, & input::-webkit-outer-spin-button': {
    margin: 0,
  },
  '& input[type=number]': {
    '-moz-appearance': 'textfield',
  },
  '& label.Mui-focused': {},
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.success,
      color: theme.palette.success,
    },
  },
}));

export default CustomTextField;

//+++++++++++++++++++++++++++++++
//TODO
// import { styled } from '@mui/system';
// import { TextField } from '@mui/material';
// import { Theme } from '@mui/material/styles';

// interface CustomTextFieldProps {
//   size: 'small' | 'medium' | 'large';
// }

// const CustomTextField = styled(TextField)<CustomTextFieldProps>(({ size }) => ({
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

// export default CustomTextField;
