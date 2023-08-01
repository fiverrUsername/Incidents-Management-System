import TimelineContent from '@mui/lab/TimelineContent';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import { Avatar } from '@mui/material';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import React from 'react';

import { ITimeLineEventprops } from '../../../interface/timeLineInterface';
import { TimelineConnectorWrapper, TimelineDotWrapper, TimelineItemWrapper } from './timeLineEvent.style';


const timeLineEvent: React.FC<ITimeLineEventprops> = (props) => {
    const { timeline, isPriorityChanged, isTypeChanged, previousType, previosPriority, name, profile } = props
    const { description, createdDate } = timeline
    const date = dayjs(createdDate).format("DD/MM/YYYY")

    return <div >
        <TimelineItemWrapper>
            <TimelineSeparator>
                <TimelineDotWrapper>
                    <Avatar src={profile} alt={name} />
                </TimelineDotWrapper>
                <TimelineConnectorWrapper />
            </TimelineSeparator>
            <TimelineContent>
                <Typography variant='bold'>
                    {name}
                </Typography>
                <Typography variant='date'>
                    {date.toString()}
                </Typography>

                {isPriorityChanged === true ? <><Typography variant='boldGreen'> Priority Change: </Typography>
                    <Typography> {previosPriority} to {timeline.priority}</Typography></> : ""}
                {isTypeChanged === true ? <><Typography variant='boldGreen'> Type Change: </Typography>
                    <Typography>{previousType} to {timeline.type}</Typography></> : ""}
                <Typography variant='longText'>
                    {description}
                </Typography>

            </TimelineContent>
        </TimelineItemWrapper>
        {/* <Attachment /> */}
    </div>
}

export default timeLineEvent