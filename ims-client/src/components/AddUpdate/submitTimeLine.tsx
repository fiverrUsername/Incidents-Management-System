import React from 'react'
import IIncident from '../../interface/incidentInterface'
import apiCalls from '../../service/apiCalls'
import { FormData } from '../AddUpdate/AddUpdate'
import ITimeLineEvent from '../../interface/timeLineInterface'
import { v4 as uuidv4 } from 'uuid';

interface Props {
  data: FormData;
  incident: IIncident
}

export default async function submitTimeLine(props: Props) {

  const timeLineEvent:ITimeLineEvent= {
    id: uuidv4(),
    incidentId: props.incident.id,
    userId: "698cbeda854a5d4d8bcf303l",
    description: props.data.text,
    priority: props.data.priority,
    type: props.data.type,
    tags:props.data.tags,
    files: props.data.files,
    createdDate: props.data.date,
    updatedDate: new Date()
  }
   await apiCalls.addTimelineEvent(timeLineEvent)
   console.log('I am in submit timeline');

}