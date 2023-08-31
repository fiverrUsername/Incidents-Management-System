import { Timeline, timelineItemClasses } from '@mui/lab';
import { styled } from '@mui/material';

export const TimelineWarpper = styled(Timeline)(() => ({
    ' &': {
        [`& .${timelineItemClasses.root}:before`]: {
            flex: 0,
            padding: 0,

        },
    },
    backgroundColor: "white"
}))