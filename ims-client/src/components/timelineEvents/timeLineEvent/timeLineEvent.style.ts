import { TimelineConnector, TimelineDot, TimelineItem } from '@mui/lab';
import { styled } from '@mui/material';

export const TimelineConnectorWrapper = styled(TimelineConnector)`
        'width': '0px',
        'height': '165px',
        'border': '5px solid #EBF3EE',
        'borderRadius': '50px'
`
export const TimelineItemWrapper = styled(TimelineItem)(() => ({
    ' &': {
        flex: 2,
    },
    fontSize: '1.071429rem',
    lineHeight: '0.5',
}))



export const TimelineDotWrapper = styled(TimelineDot)`
    border-color:black;
    border-width:1px;
    padding:0;
`
