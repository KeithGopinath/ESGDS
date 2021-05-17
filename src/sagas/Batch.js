import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as actionCreators from '../actionCreators/Batch';
import { doGet } from '../utils/fetchWrapper';

export function* getBatchRequest() {
  // const currentRole = sessionStorage.role;
  try {
    const response = yield doGet(envConfig.apiEndPoints.getBatchlist);
    yield put(actionCreators.getBatchSuccess(response));
  } catch (error) {
    yield put(actionCreators.getBatchFailure(error));
  }
}

export function* getBatchWatchers() {
  yield [
    takeLatest('BATCH_REQUEST', getBatchRequest),
  ];
}
