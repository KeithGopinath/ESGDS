import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as actionCreators from '../actionCreators/ReportsTaskList';
import { doGet } from '../utils/fetchWrapper';

export function* getReportsTaskListRequest() {
  try {
    const response = yield doGet(envConfig.apiEndPoints.getReportsTaskList);
    yield put(actionCreators.getReportsTaskListSuccess(response));
  } catch (error) {
    yield put(actionCreators.getReportsTaskListFailure(error));
  }
}

export function* getReportsTaskListWatchers() {
  yield [
    takeLatest('GET_REPORTS_TASKLIST_REQUEST', getReportsTaskListRequest),
  ];
}
