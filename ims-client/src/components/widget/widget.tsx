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
const NewGrid = styled(Grid)(({ theme }) => ({
  width: '437px',
  height: '147px',
  borderRadius: '20px',
  paddingLeft: '40px',
  backgroundColor: theme.palette.primary.contrastText,
  boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
  border: '1px solid rgba(0, 0, 0, 0.1)'
}));
export default function Widget({ title, aggregation, icon }: WidgetProps) {
  const formattedAggregation = aggregation.toLocaleString();
  return (
    <NewGrid container spacing={{ xs: 2, md: 3 }} >
      <Grid container spacing={3}>
        <Grid item xs={6} sm={4} sx={{ display: 'flex', alignItems: 'center' }}>
          <StyledButtonBase sx={{ marginRight: 2 }}>
            <StyledIcon>
              {React.cloneElement(icon, {
                sx: { fontSize: '100px' }, // Adjust the icon size as needed
              })}
            </StyledIcon>
          </StyledButtonBase>
          <div>
            <Typography noWrap>{title}</Typography>
            <Typography variant="widget" noWrap>{formattedAggregation}</Typography>
          </div>
        </Grid>
      </Grid>
    </NewGrid>
  );
}