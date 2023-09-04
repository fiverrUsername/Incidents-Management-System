import { all, fork } from "redux-saga/effects"

import IncidentSaga from '../pages/incidents/modules/saga'
// import systemsStatusSaga from "../pages/liveStatus/modules/saga"

export default function* root() {
    // yield all([fork(IncidentSaga),fork(systemsStatusSaga)])
}