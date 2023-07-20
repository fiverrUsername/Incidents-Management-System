import React from 'react'
import {StyledBox, StyledPaper} from '../../pages/timeLine/timeLinePage.style'
import { ISummary } from '../../interface/ISummary';
 


interface propsDisplaySummary
{
    summaryIncident:ISummary
}
const DisplaySummary = ({summaryIncident}:propsDisplaySummary) => {
//const formattedDate = incident.date.toLocaleDateString('en-GB');
return(
<StyledPaper>
    <StyledBox>Created by:{summaryIncident.createdBy}</StyledBox>
       {/* <StyledBox>Created at: {summaryIncident.createdAt}</StyledBox> */}
      <StyledBox>Current priority: {summaryIncident.currentPriority}</StyledBox>
      <StyledBox>Affected services: {/* tags */} </StyledBox>
</StyledPaper>
);
};

export default DisplaySummary;