import { call, put, takeEvery } from 'redux-saga/effects'

import { actions } from './slice'
import IIncident from '../../../interfaces/IIncident'
import backendServices from '../../../services/backendServices/backendServices'



function* onGetIncidents() {
    try {
        const data:IIncident[] = yield call(backendServices.getIncidents)
        yield put(actions.onGetIncidentsSuccess(data))
    } catch (error) {
        console.log(error)
    }
}

export default function* watchIncidents() {
    yield takeEvery(actions.onGetIncidentsRequest, onGetIncidents)
}