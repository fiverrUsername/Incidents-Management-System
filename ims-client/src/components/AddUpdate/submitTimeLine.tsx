import React from 'react'
import IIncident from '../../interface/incidentInterface'
import apiCalls from '../../service/apiCalls'
import { GetIncident, form_data } from '../AddUpdate/AddUpdate'
import {ITimeLineEvent} from '../../interface/timeLineInterface'


interface Props {
  data: form_data;
  incident: GetIncident;
}

export default async function submitTimeLine(props: Props) {
  let flag: boolean;
  const timeLineEvent: ITimeLineEvent = {
    incidentId: props.incident.id,
    userId: "698cbeda854a5d4d8bcf303l",
    description: props.data.text,
    priority: props.data.priority,
    type: props.data.type,
    tags: props.data.tags,
    files: props.data.files,
    createdDate: props.data.date,
    updatedDate: new Date()
  }
  try {
    await apiCalls.addTimelineEvent(timeLineEvent);
    flag = true;
  }
  catch (error) {
    flag = false;
  }
  return flag;
}