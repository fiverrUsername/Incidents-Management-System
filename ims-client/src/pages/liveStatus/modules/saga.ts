// import { call, put, takeEvery } from 'redux-saga/effects'
// import { actions } from './slice'
// import { liveStatusCollection } from '../../../interfaces/ILiveStatus'
// import backendServices from '../../../services/backendServices/backendServices'


// function* onGetLiveStatus() {
//     try {
//         const data: liveStatusCollection = yield call(backendServices.getLiveStatus)
//         yield put(actions.onGetLiveStatusSuccess(data))
//     } catch (error:any) {
//         console.error(error)
//     }
// }

 export default function* watchSystemsStatus() {
//     yield takeEvery(actions.onGetLiveStatusRequest, onGetLiveStatus)
}