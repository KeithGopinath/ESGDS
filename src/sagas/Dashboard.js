import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as actionCreators from '../actionCreators/Dashboard';
import { doGet } from '../utils/fetchWrapper';

export function* getDashboardRequest() {
  try {
    const response = yield doGet(envConfig.apiEndPoints.getDashboard);
    yield put(actionCreators.getDashboardSuccess(response));
  } catch (error) {
    yield put(actionCreators.getDashboardFailure(error));
  }
}

export function* getDashboardWatchers() {
  yield [
    takeLatest('GET_DASHBOARD_REQUEST', getDashboardRequest),
  ];
}
