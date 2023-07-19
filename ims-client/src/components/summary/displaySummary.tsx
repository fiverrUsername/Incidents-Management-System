import React from 'react'
import {StyledBox, StyledPaper} from '../../pages/timeLine/timeLinePage.style'
import { Incident } from '../../pages/timeLine/modules/interface'


interface propsDisplaySummary
{
incident:Incident
}
const DisplaySummary = ({incident}:propsDisplaySummary) => {
//const formattedDate = incident.date.toLocaleDateString('en-GB');
return(
<StyledPaper>
    <StyledBox>Created by:{incident.createdBy}</StyledBox>
       <StyledBox>Created at: {incident.createdAt}</StyledBox>
      <StyledBox>Current priority: {incident.priority}</StyledBox>
      <StyledBox>Affected services: {/* tags */} </StyledBox>
</StyledPaper>
);
};

export default DisplaySummary;