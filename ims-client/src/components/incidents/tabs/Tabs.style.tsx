
import { SxProps } from '@mui/system'

export const TabStyles: SxProps = {
  '& .MuiTabs-indicator': {
    display: 'none',
  },
  '& .MuiTab-root': {
    marginRight: '5px',
    color: 'inherit',
    '&.Mui-selected': {
      color: 'white',
    },
    
    borderRadius: '5px 5px 0 0',
    borderBottom: '1px solid green',
    '&:hover': {
      borderBottom: '1px solid green',
    },
  },
};