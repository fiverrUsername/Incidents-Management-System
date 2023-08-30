import { combineReducers } from "@reduxjs/toolkit"

import incidentsSlice, { INCIDENT_STATE_KEY } from '../pages/incidents/modules/slice'
import systemsStatusSlice, { LIVE_STATUS_STATE_KEY } from "../pages/liveStatus/modules/slice"

const createdAppReducer = combineReducers({
    [INCIDENT_STATE_KEY]: incidentsSlice,
    [LIVE_STATUS_STATE_KEY]:systemsStatusSlice
})

const reducer = (state: any, action: any) => {
    return createdAppReducer(state, action)
}

export default reducer