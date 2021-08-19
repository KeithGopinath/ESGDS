import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as actionCreators from '../actionCreators/DownloadJson';
import { doPost } from '../utils/fetchWrapper';

export function* downloadJsonRequest(data) {
  try {
    const response = yield doPost(envConfig.apiEndPoints.downloadJson, data.payload);
    yield put(actionCreators.downloadJsonSuccess(response));
  } catch (error) {
    yield put(actionCreators.downloadJsonFailure(error));
  }
}

export function* downloadJsonWatchers() {
  yield [
    takeLatest('DOWNLOAD_JSON_REQUEST', downloadJsonRequest),
  ];
}
