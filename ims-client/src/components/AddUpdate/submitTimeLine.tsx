import React from 'react'
import IIncident from '../../interface/incidentInterface'
import apiCalls from '../../service/apiCalls'
import { FormData } from '../AddUpdate/AddUpdate'
import ITimeLineEvent from '../../interface/timeLineInterface'


 interface Props {
    data:FormData;
    incident:IIncident
  }

export default async function submitIncident(props:Props) {
    
    const incidentcR:ITimeLineEvent={
        incidentId: props.incident.id,
        userId:"698cbeda854a5d4d8bcf303l",
        description: props.data.text,
        priority:props.data.priority,
        type:,
        files:[] ,
        createdDate: props.data.date,
        updatedDate:new Date()
    }


    await apiCalls.(incidentcR)
    console.log('I am in submit incident')



}