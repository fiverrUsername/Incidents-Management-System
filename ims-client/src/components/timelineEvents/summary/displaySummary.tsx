import { Box, Chip, Grid } from '@mui/material';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { ISummary } from '../../../interfaces/ISummary';
import { StyledBox, StyledPaper } from '../../../pages/timeLine/timeLinePage.style';
import theme from '../../../theme';
import backendServices from '../../../services/backendServices/backendServices';
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
        const intervalId = setInterval(fetchData, 60000); // 60000 milliseconds = 1 minute
        return () => clearInterval(intervalId);
    }, [id]);

    const date = summaryIncident?.createdAt
        ? dayjs(summaryIncident.createdAt).format("DD/MM/YYYY")
        : "";
    return (
        <StyledPaper>
            {summaryIncident && (
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
                        {summaryIncident.tags.length !== 0 && (
                            <Box style={{ borderRadius: '10px', border: '1px solid' + theme.palette.info.main, width: "100%", height: "auto", padding: "1.5% " }}>
                                {summaryIncident.tags.map((tag, index) => (
                                    <Chip sx={{ border: '1px solid' + theme.palette.secondary.main, color: theme.palette.secondary.main, backgroundColor: theme.palette.secondary.light, margin: "0.5%" }} key={index} label={tag.name} />
                                ))}
                            </Box>
                        )}
                    </Grid>
                </Grid>
            )}
        </StyledPaper>
    );
};

export default DisplaySummary;
