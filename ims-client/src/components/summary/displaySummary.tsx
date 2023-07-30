import React, { useState } from 'react'
import { CustomScrollbar, StyledBox, StyledPaper } from '../../pages/timeLine/timeLinePage.style'
import { ISummary } from '../../interface/ISummary';
import {  Box, Chip, Grid, colors } from '@mui/material';
import theme from '../../theme';
import dayjs from 'dayjs';
import { ITag } from '../../interface/ITag';
import CustomAutocomplete from '../autoCompleteTag/autoComplete';
interface propsDisplaySummary {
    summaryIncident: ISummary
}
const DisplaySummary = ({ summaryIncident }: propsDisplaySummary) => {
    const [selectedTags, setSelectedTags] = useState<ITag[]>(summaryIncident.tags);
    const [s, setS] = useState<ITag[]>([]);
    const getOptionLabel = (tag: ITag) => tag.name;
    const date = dayjs(summaryIncident.createdAt).format("DD/MM/YYYY")
    return (
        <StyledPaper>
            <Grid container direction="row" justifyContent="center" alignItems="flex-start" flexWrap="nowrap">
                <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
                    <StyledBox >Created by:<label style={{ color: theme.palette.primary.dark, fontSize: theme.typography.fontSize }}>{summaryIncident.createdBy}</label></StyledBox>
                    <StyledBox>Created at:
                        <label style={{ color: theme.palette.primary.dark, fontSize: theme.typography.fontSize }}> {date.toString()}</label>
                    </StyledBox>
                </Grid>
                <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
                    <StyledBox>Current priority: <label style={{ color: theme.palette.primary.dark, fontSize: theme.typography.fontSize }}>{summaryIncident.currentPriority}</label></StyledBox>
                </Grid>
                <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">

                    <StyledBox>Affected services:</StyledBox> 
                    {summaryIncident.tags.length!=0?
                    <CustomAutocomplete options={s} selectedOptions={selectedTags} setSelectedOptions={setSelectedTags} getOptionLabel={getOptionLabel} disabled={true} placehOlderText={''}/>:''}
                    {/* {summaryIncident.tags.length!=0 &&<> 
                    <Box style={{borderRadius: '10px' ,border: '1px solid'+ theme.palette.info.main,width:"100%",height:"auto", padding:"1.5% "}} > 
                    {summaryIncident.tags.map((tag, index) => {
                        return   <Chip sx={{ border: '1px solid' + theme.palette.secondary.main, color: theme.palette.secondary.main, backgroundColor: theme.palette.secondary.light,margin:"0.5%"  }}  key={index} label={tag.name}/> 
                    })} </Box> </> } */}
                </Grid>
            </Grid>
        </StyledPaper>
    );
}; 
export default DisplaySummary;