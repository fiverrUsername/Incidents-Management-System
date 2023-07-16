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


