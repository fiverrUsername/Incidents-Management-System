import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import React from 'react';

export interface ITabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }
  

export default function CustomTabPanel(props: ITabPanelProps) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 2 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }