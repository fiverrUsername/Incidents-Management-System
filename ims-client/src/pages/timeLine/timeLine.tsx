import React from 'react';
import userdata from '../../mockAPI/users.json';
import { ITimelineEventListprops } from './modules/interface';
import { TimelineWarpper } from './timeLine.style';
import TimeLineEvent from './timeLineEvent/timeLineEvent';
import { ITimeLineEventprops } from './modules/interface';
import { Priority } from '../../interface/enum-priority';

const TimeLine: React.FC<ITimelineEventListprops> = (props) => {
  const { timelineList } = props;
  const timeLineEvents = timelineList.sort(
    (a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
  );

  const timelineObjects = timeLineEvents.map((timeLine, index) => {
    const user = userdata.find((u) => u._id === timeLine.userId);
    const updatedTimeline: ITimeLineEventprops = {
      timeline: { ...timeLine },
      name: user?.name ?? '',
      profile: user?.profile ?? '',
      previosPriority: Priority.P0,
      previousType: Priority.P0,
      isTypeChanged: false,
      isPriorityChanged: false
    };

    if (index < timeLineEvents.length - 1) {
      const previousTimeline = timeLineEvents[index + 1];
      if (timeLine.priority !== previousTimeline.priority) {
        updatedTimeline.isPriorityChanged = true;
        updatedTimeline.previosPriority = previousTimeline.priority;
      }
      if (timeLine.type !== previousTimeline.type) {
        updatedTimeline.isTypeChanged = true;
        updatedTimeline.previousType = previousTimeline.type;
      }
    }

    return updatedTimeline;
  });

  return (
    <TimelineWarpper>
      {timelineObjects.map((timeLine: ITimeLineEventprops, i: number) => (
        <TimeLineEvent
          key={i}
          timeline={timeLine.timeline}
          isPriorityChanged={timeLine.isPriorityChanged}
          isTypeChanged={timeLine.isTypeChanged}
          previousType={timeLine.previousType}
          previosPriority={timeLine.previosPriority}
          profile={timeLine.profile}
          name={timeLine.name}
        />
      ))}
    </TimelineWarpper>
  );
};

export default TimeLine;
