import { ITimeLineEvent } from '../../../interfaces/ITimeLineEvent'
import { dataFromForm, receivedIncident } from '../../../components/timelineEvents/addTimelineEvent.ts/addTimelineEventForm/addTimelineEventForm';
import backendServices from '../../backendServices/backendServices';
import log from '../../../loggers/logger';
import { constants } from '../../../const'
interface Props {
  data: dataFromForm;
  incident: receivedIncident;
  addNewTimelineFunction: (newTimeline: ITimeLineEvent) => void
  updateIncidentFunction: (newIncident: receivedIncident) => void

}

export default async function submitTimeLine(props: Props) {
  let isSuccess: boolean;
  const timeLineEvent: ITimeLineEvent = {
    incidentId: props.incident.id,
    channelId: props.incident.channelId,
    userId: "698cbeda854a5d4d8bcf303l",
    description: props.data.text,
    priority: props.data.priority,
    type: props.data.type,
    tags: props.data.tags,
    files: props.data.filesString,
    createdDate: props.data.date,
    updatedDate: new Date(),
    status: props.data.status,
  }
  const newIncident: receivedIncident = {
    ...props.incident,
    currentPriority: props.data.priority,
    status: props.data.status,
    currentTags: props.data.tags,
    type: props.data.type
  }

  try {
    const newTimeLine = await backendServices.addTimelineEvent(timeLineEvent);
    props.addNewTimelineFunction(newTimeLine);
    props.updateIncidentFunction(newIncident);
    isSuccess = true;
    log.info({message:constants.ADD_TIME_LINE_EVENT_TO_SERVER_SUCCESS,source:"submitTimeLineEvent"})

  }
  catch (error) {
    isSuccess = false;
    log.error({message:constants.ADD_TIME_LINE_EVENT_TO_SERVER_FAILED,source:"submitTimeLineEvent"})
  }
  return isSuccess;
}