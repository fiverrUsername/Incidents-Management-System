import { AnyAction, CombinedState, combineReducers } from "@reduxjs/toolkit"
import IIncident from "../interfaces/IIncident"
import { liveStatusCollection } from "../interfaces/ILiveStatus"

import incidentsSlice, { INCIDENT_STATE_KEY } from '../pages/incidents/modules/slice'
import systemsStatusSlice, { LIVE_STATUS_STATE_KEY } from "../pages/liveStatus/modules/slice"

const createdAppReducer = combineReducers({
    [INCIDENT_STATE_KEY]: incidentsSlice,
    [LIVE_STATUS_STATE_KEY]:systemsStatusSlice
})

const reducer = (state: CombinedState<{ INCIDENT: { incidents: IIncident[] }; LIVE_STATUS: liveStatusCollection }> | undefined, action: AnyAction) => {
    return createdAppReducer(state, action)
}

export default reducer