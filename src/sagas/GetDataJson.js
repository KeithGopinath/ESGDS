import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as actionCreators from '../actionCreators/GetDataJson';
import { doGet } from '../utils/fetchWrapper';

export function* getDataJsonRequest() {
  try {
    const response = yield doGet(envConfig.apiEndPoints.getDataJson);
    yield put(actionCreators.getDataJsonSuccess(response));
  } catch (error) {
    yield put(actionCreators.getDataJsonFailure(error));
  }
}

export function* getDataJsonWatchers() {
  yield [
    takeLatest('GET_DATA_JSON_REQUEST', getDataJsonRequest),
  ];
}
