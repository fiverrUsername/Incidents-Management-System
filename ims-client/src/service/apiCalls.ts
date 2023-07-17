import axios from "axios"
import  IIncident from "../interface/incidentInterface"

const apiCalls = {
    //להוסיף את כל הקריאות שרת
    getIncidents: () => axios.get(`http://127.0.0.1:7000/incident`).then(response => response.data),
    getAggregation:() => axios.get(`http://127.0.0.1:7000/aggregation`).then(response => response.data),
    createIncident:(incident:IIncident) => axios.post(`http://127.0.0.1:7000/incident`,incident).then(response => response.data),
    getTimeLineForIncident:(id:string)=>axios.get(`http://localhost:7000/incident/${id}`).then(response => response.data),
    
}

export default apiCalls