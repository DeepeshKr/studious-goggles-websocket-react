import { call, put, takeEvery } from 'redux-saga/effects';
import { fetchDataSuccess, fetchDataFailure } from './actions';
import { fetchDataFromAPI } from './api';

function* fetchDataSaga(action) {
  try {
    const data = yield call(fetchDataFromAPI, action.payload);
    yield put(fetchDataSuccess(data));
  } catch (error) {
    yield put(fetchDataFailure(error));
  }
}

function* mySaga() {
  yield takeEvery('FETCH_DATA_REQUEST', fetchDataSaga);
}

export default mySaga;
