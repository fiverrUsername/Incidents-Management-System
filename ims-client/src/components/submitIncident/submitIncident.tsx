import React from 'react'
import IIncident from '../../interface/incidentInterface'
import apiCalls from '../../service/apiCalls'
import { FormData } from '../AddIncident/addIncident'


export default async function submitIncident(prop:FormData) {
    
    const incidentcR:IIncident={
        //TODO
        //Remove the id
        id: "1",
        name: prop.name,
<<<<<<< HEAD
        status: "Active",
        description: prop.description,
        priority: prop.priority,
        type: prop.type,
        durationHours: 0,
        slackLink: prop.slackLink,
        tags: prop.tags.map(tag => ({ id: tag.id, name: tag.name })),
=======
        status:"Active",
        description:prop.description,
        currentPriority: prop.priority,
        type: prop.type,
        durationHours: 0,
        slackLink:"",
        channelName: prop.channelName,
        channelId:"",
        // tags: prop.tags.map(tag => ({ id: tag.userId, name: tag.name })),
        tags: prop.tags.map(tag => ({ id: tag.userId, name: tag.name })),

>>>>>>> 250be13e4917688ae1ef36899c837db5b37e91d9
        date: prop.date.toDate(),
        createdAt: new Date(),
        updatedAt: new Date(),
        //TODO
        createdBy:"?",
        cost: 0,
        createdBy: ''
    }


    await apiCalls.createIncident(incidentcR)
    console.log('I am in submit incident')
}