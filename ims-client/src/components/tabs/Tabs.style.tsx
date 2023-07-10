
import { SxProps } from '@mui/system'

export const TabStyles: SxProps = {
  '& .MuiTabs-indicator': {
    display: 'none',
  },
  '& .MuiTab-root': {
    marginLeft: '5px',
    color: 'inherit',
    '&.Mui-selected': {
      color: 'white',
      // backgroundColor: '#FFFFFF',
    },
    borderRadius: '5px 5px 0 0',
    borderBottom: '1px solid green',
    '&:hover': {
      borderBottom: '1px solid green',
    },
  },
};