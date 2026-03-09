import TimelineContent from '@mui/lab/TimelineContent';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import { Avatar } from '@mui/material';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import React from 'react';
import { ITimeLineEventprops } from '../../../interfaces/ITimeLineEvent';
import { TimelineConnectorWrapper, TimelineDotWrapper, TimelineItemWrapper } from './timeLineEvent.style';
import Attachmentlist from '../attachment/attachmentList';
import  './timeLineEvent.css';

const timeLineEvent: React.FC<ITimeLineEventprops> = (props) => {
    const { timeline, isPriorityChanged, isTypeChanged, previousType, previosPriority, name, profile } = props
    const { description, createdDate } = timeline
    const date = dayjs(createdDate).format("DD/MM/YYYY")

    return <div className='flex-container' style={{display:"flex" }}>
        
        <TimelineItemWrapper>
            <TimelineSeparator>
                <TimelineDotWrapper>
                    <Avatar src={profile} alt={name} />
                </TimelineDotWrapper>
                <TimelineConnectorWrapper />
            </TimelineSeparator>
            <TimelineContent sx={{'@media (max-width: 600px)': {fontSize:'14px'},}}>
                <Typography variant='bold' sx={{'@media (max-width: 600px)': {fontSize:'14px'},}}>
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
        <Attachmentlist id={timeline.id ? timeline.id : ""} files={timeline.files} />

    </div>
}

export default timeLineEvent