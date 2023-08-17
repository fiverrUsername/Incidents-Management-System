import React from 'react'
import IIncident from '../../interface/incidentInterface'
import apiCalls from '../../service/apiCalls'
import { FormData } from '../AddIncident/addIncident'
import { Status } from '../../interface/enums'


export default async function submitIncident(data: FormData, incident: IIncident[], setIncident: any) {

    const incidentcR: IIncident = {
        //TODO
        name: data.name,
        status: Status.Active,
        description: data.description,
        currentPriority: data.priority,
        type: data.type,
        durationHours: 0,
        slackLink: "",
        channelName: data.channelName,
        channelId: "",
        currentTags: data.tags.map(tag => ({ id: tag.id, name: tag.name })),
        date: data.date.toDate(),
        createdAt: new Date(),
        updatedAt: new Date(),
        //TODO
        createdBy: "?",
        cost: 0,
    }
    const updatedIncidents = [incidentcR,...incident]
    setIncident(updatedIncidents)
    try {
        await apiCalls.createIncident(incidentcR);
        return true;
    } catch (error) {
        console.error('Error creating incident:', error);
        return false;
    }
}
