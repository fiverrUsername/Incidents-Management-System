import { Box, Chip, Grid, ThemeProvider, createTheme, useMediaQuery, } from '@mui/material';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { ISummary } from '../../../interfaces/ISummary';
import { StyledBox, StyledPaper } from './displaySummary.style'
import theme from '../../../theme';
import backendServices from '../../../services/backendServices/backendServices';
import { StyleLabel } from './displaySummary.style';
import log from '../../../loggers/logger'

interface propsDisplaySummary {
    id: string
}

const DisplaySummary = ({ id }: propsDisplaySummary) => {
    const [summaryIncident, setSummaryIncident] = useState<ISummary | null>(null);

    const fetchData = async () => {
        try {
            const summary = await backendServices.getSummaryIncident(id);
            setSummaryIncident(summary);
        } catch (error) {
            log.error({ message: "failed to fetch summary\t IncidentId:" + id, source: "displaySummary" });
        }
    };

    useEffect(() => {
        fetchData();
        const intervalId = setInterval(fetchData, 3600000); // 1 hour
        return () => clearInterval(intervalId);
    }, [id]);

    const date = summaryIncident?.createdAt
        ? dayjs(summaryIncident.createdAt).format("DD/MM/YYYY")
        : "";
        
        const isMobile480px = useMediaQuery('(max-width: 480px)');
        const isMobile768px = useMediaQuery('(max-width: 820px)');
        const gridDirection = isMobile480px ? 'column' : isMobile768px?'column':'row';

    return (
        <StyledPaper  >
            {summaryIncident && (
               < div>
                <Grid container direction={gridDirection}  justifyContent="center" alignItems="flex-start" flexWrap="nowrap">
                    <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
                        <StyledBox >Created by:<StyleLabel >{summaryIncident.createdBy}</StyleLabel></StyledBox>
                        {isMobile480px?'':isMobile768px?'': <br />} 
                        <StyledBox>Created at:
                            <StyleLabel > {date.toString()}</StyleLabel>
                        </StyledBox>
                    </Grid>
                    <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
                        <StyledBox>Current priority: <StyleLabel  >{summaryIncident.currentPriority}</StyleLabel></StyledBox>
                    </Grid>
                    <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
                        <StyledBox>Affected services:</StyledBox>
                        {summaryIncident.tags.length !== 0 && (
                            <Box style={{ borderRadius: '10px', border: '1px solid' + theme.palette.info.main, width: "100%", height: "auto", padding: "1.5% " }}>
                                {summaryIncident.tags.map((tag, index) => (
                                    <Chip sx={{ border: '1px solid' + theme.palette.secondary.main, color: theme.palette.secondary.main, backgroundColor: theme.palette.secondary.light, margin: "0.5%" }} key={index} label={tag.name} />
                                ))}
                            </Box>
                        )}
                    </Grid>
                </Grid>
                </div>
            )}
        </StyledPaper>
    );
};

export default DisplaySummary;
