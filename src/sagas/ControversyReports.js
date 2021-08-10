import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as actionCreators from '../actionCreators/ControversyReports';
import { doGet } from '../utils/fetchWrapper';

export function* getControversyReportsRequest() {
  try {
    const response = yield doGet(envConfig.apiEndPoints.getControversyReports);
    yield put(actionCreators.getControversyReportsSuccess(response));
  } catch (error) {
    yield put(actionCreators.getControversyReportsFailure(error));
  }
}

export function* getControversyReportsWatchers() {
  yield [
    takeLatest('GET_CONTROVERSY_REPORTS_REQUEST', getControversyReportsRequest),
  ];
}
