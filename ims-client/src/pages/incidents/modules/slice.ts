import { createSelector, createSlice, Slice } from "@reduxjs/toolkit"
import IIncident from "../../../interfaces/IIncident"

export const INCIDENT_STATE_KEY: string = 'INCIDENT'

type State = {
    incidents: IIncident[]
}

const initialState: State = { incidents: [] }

const slice: Slice<any> = createSlice({
    name: INCIDENT_STATE_KEY,
    initialState,
    reducers: {
        onGetIncidentsRequest: () => {
            console.log('')
        },
        onGetIncidentsSuccess: (state, action) => {
            state.incidents = action.payload
        },
    }
})

const getState = (state: any) => {
    return state[INCIDENT_STATE_KEY] || initialState
}

export const selectors = {
    selectIncidents: createSelector(getState, (state) => state.incidents)
}

export const actions = { ...slice.actions }

export default slice.reducer