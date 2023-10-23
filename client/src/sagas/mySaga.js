import { all, call, put, takeEvery } from 'redux-saga/effects';

import * as api from "../constants/api";


import {ROOM_LOADING, SG_CREATE_CHAT_ROOM, CREATE_CHAT_ROOM, SG_FETCH_CHAT_ROOM, FETCH_CHAT_ROOM, FETCH_FAILURE} from "../constants/actions"

function* fetchProcess(action) {
  yield put({ type: ROOM_LOADING });
  try {
    const json = yield call(api.GET_CHAT_ROOMS, action.payload);
    yield put({ type: FETCH_CHAT_ROOM, payload: json.data });
  } catch (e) {
    yield put({ type: FETCH_FAILURE, error: e.message });
  }
}

function* fetchSaga() {
  yield takeEvery(SG_FETCH_CHAT_ROOM, fetchProcess);
}


function* createProcess(action) {
  yield put({ type: ROOM_LOADING });
  try {
    const json = yield call(api.CREATE_CHAT_ROOM, action.payload);
    yield put({ type: CREATE_CHAT_ROOM, payload: json.data });
  } catch (e) {
    yield put({ type: FETCH_FAILURE, error: e.message });
  }
}

function* createSaga() {
  yield takeEvery(SG_CREATE_CHAT_ROOM, createProcess);
}


export default function* index() {
  yield all([
    fetchSaga(),
    createSaga(),

  ]);
}
