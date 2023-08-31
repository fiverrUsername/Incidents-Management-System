
import {ITimeLineEvent} from '../../../interfaces/ITimeLineEvent'
import { dataFromForm, receivedIncident } from '../../../components/timelineEvents/addTimelineEvent.ts/addTimelineEventForm/addTimelineEventForm';
import backendServices from '../../backendServices/backendServices';

interface Props {
  data: dataFromForm;
  incident: receivedIncident;
  addNewTimelineFunction: (newTimeline: ITimeLineEvent) => void
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
  try {
   const newTimeLine= await backendServices.addTimelineEvent(timeLineEvent);
   props.addNewTimelineFunction(newTimeLine);
   isSuccess = true;
  }
  catch (error) {
    isSuccess = false;
  }
  return isSuccess;
}