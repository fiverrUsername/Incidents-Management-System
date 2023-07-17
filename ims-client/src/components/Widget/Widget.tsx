import React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import { Box } from '@mui/material';
import theme from '../../theme';

interface WidgetProps {
  title: string;
  aggregation: number;
  icon: JSX.Element;
}

const StyledButtonBase = styled(ButtonBase)(({ theme }) => ({
  width: '102px',
  height: '102px',
  borderRadius: '10px',
  backgroundColor: theme.palette.secondary.light,
}));

const StyledIcon = styled('div')(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '65px', 
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  width: '464px',
  height: '170px',
  borderRadius: '20px',
  display: 'flex',
  paddingLeft: '40px',
  alignItems: 'center',
}));

export default function Widget({ title, aggregation, icon }: WidgetProps) {
  const formattedAggregation = aggregation.toLocaleString();
  return (
    <StyledPaper>
      <Grid container spacing={3}>
        <Grid item>
          <StyledButtonBase>
            <StyledIcon>
              {React.cloneElement(icon, {
                sx: { fontSize: '80px' },
              })}
            </StyledIcon>
          </StyledButtonBase>
        </Grid>
        <Grid item xs color="text.primary">
          <Typography >{title}</Typography>
          <Typography variant="widget">{formattedAggregation}
          </Typography>
        </Grid>
      </Grid>
    </StyledPaper>
  );
}