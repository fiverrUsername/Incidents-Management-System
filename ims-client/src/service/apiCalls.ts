import axios from "axios"
import IIncident from "../interface/incidentInterface"
import { ITimeLineEvent } from "../interface/timeLineInterface"
const baseUrl = process.env.REACT_APP_API_KEY

const apiCalls = {
  getIncidents: () => axios.get(`${baseUrl}/incident`).then(response => response.data),
  getAggregation: () => axios.get(`${baseUrl}/aggregation`).then(response => response.data),
  createIncident: (incident: IIncident) => axios.post(`${baseUrl}/incident/addIncident`, incident).then(response => response.data),
  getTags: () => axios.get(`${baseUrl}/tag`).then(response => response.data),
  getIncidentById: (id: string) => axios.get(`${baseUrl}/incident/${id}`).then(response => response.data),
  getSummaryIncident: (id: string) => axios.get(`${baseUrl}/incident/summary/${id}`).then(response => response.data),
  getTimeLineEventsById: (id: string) => axios.get(`${baseUrl}/timelineEvent/${id}`).then(response => response.data),
  timelineEventByIncidentId: (id: string) => axios.get(`${baseUrl}/timelineEvent/timelineEventByIncidentId/${id}`).then(response => response.data),
  getTimeLineForIncident: (id: string) => axios.get(`${baseUrl}/incident/${id}`).then(response => response.data),
  addTimelineEvent: (timeLineEvent: ITimeLineEvent) => axios.post(`${baseUrl}/timelineEvent`, timeLineEvent).then(response => response.data),
  deleteFileInTimeLine: (id: string, key: string) => axios.delete(`${baseUrl}/timelineEvent/${id}/files`, {
    params: { key }
  }).then(response => response.data),
  getSystemsStatus: () => axios.get(`${baseUrl}/livestatus/`).then(response => response.data),

}

export default apiCalls