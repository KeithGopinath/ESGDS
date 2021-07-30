import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as actionCreators from '../actionCreators/Reports';
import { doGet } from '../utils/fetchWrapper';

export function* getReportsRequest() {
  try {
    const response = yield doGet(envConfig.apiEndPoints.getReports);
    yield put(actionCreators.getReportsSuccess(response));
  } catch (error) {
    yield put(actionCreators.getReportsFailure(error));
  }
}

export function* getReportsWatchers() {
  yield [
    takeLatest('GET_REPORTS_REQUEST', getReportsRequest),
  ];
}
