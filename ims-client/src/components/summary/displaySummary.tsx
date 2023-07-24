import React from 'react'
import { StyledBox, StyledPaper } from '../../pages/timeLine/timeLinePage.style'
import { ISummary } from '../../interface/ISummary';
import { Grid, colors } from '@mui/material';
import theme from '../../theme';
import dayjs from 'dayjs';



interface propsDisplaySummary {
    summaryIncident: ISummary
}
const DisplaySummary = ({ summaryIncident }: propsDisplaySummary) => {
    
    const date = dayjs(summaryIncident.createdAt).format("DD/MM/YYYY")
    return (
        <StyledPaper>
            <Grid container direction="row" justifyContent="center" alignItems="flex-start" flexWrap="nowrap">
                <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
                    <StyledBox >Created by:<label style={{color:theme.palette.primary.dark ,fontSize:theme.typography.fontSize}}>{summaryIncident.createdBy}</label></StyledBox>
                    <StyledBox>Created at:
                      <label style={{color:theme.palette.primary.dark ,fontSize:theme.typography.fontSize}}> {date.toString()}</label> 
                    </StyledBox>
                </Grid>
                <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
                    <StyledBox>Current priority: <label style={{color:theme.palette.primary.dark ,fontSize:theme.typography.fontSize}}>{summaryIncident.currentPriority}</label></StyledBox>
                </Grid>

                <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
                    
                   {summaryIncident.tags&&<StyledBox>Affected services: {summaryIncident.tags.map((tag,index)=>{
                        return  <span key={index}>{tag.name}</span>
                    })}  </StyledBox>} 
                </Grid>
            </Grid>
        </StyledPaper>
    );
};

export default DisplaySummary;