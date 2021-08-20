import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as actionCreators from '../actionCreators/GetControversyJson';
import { doGet } from '../utils/fetchWrapper';

export function* getControversyJsonRequest() {
  try {
    const response = yield doGet(envConfig.apiEndPoints.getControversyJson);
    yield put(actionCreators.getControversyJsonSuccess(response));
  } catch (error) {
    yield put(actionCreators.getControversyJsonFailure(error));
  }
}

export function* getControversyJsonWatchers() {
  yield [
    takeLatest('GET_CONTROVERSY_JSON_REQUEST', getControversyJsonRequest),
  ];
}
