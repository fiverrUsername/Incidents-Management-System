import React from 'react'
import { StyledBox, StyledPaper } from '../../pages/timeLine/timeLinePage.style'
import { ISummary } from '../../interface/ISummary';
import { Grid, colors } from '@mui/material';
import theme from '../../theme';



interface propsDisplaySummary {
    summaryIncident: ISummary
}
const DisplaySummary = ({ summaryIncident }: propsDisplaySummary) => {
    // const formattedDate = summaryIncident.createdAt.toLocaleDateString('en-GB');
    return (
        <StyledPaper>
            <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start" flexWrap="nowrap">
                <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
                    <StyledBox>Created by:<label >{summaryIncident.createdBy}</label></StyledBox>
                    <StyledBox>Created at:
                        {/* {summaryIncident.createdAt} */}
                    </StyledBox>
                </Grid>
                <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
                    <StyledBox>Current priority: <label style={{color:theme.palette.primary.dark ,fontSize:theme.typography.fontSize}}>{summaryIncident.currentPriority}</label></StyledBox>
                </Grid>
                <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
                    <StyledBox>Affected services: {/* tags */} </StyledBox>
                </Grid>
            </Grid>
        </StyledPaper>
    );
};

export default DisplaySummary;