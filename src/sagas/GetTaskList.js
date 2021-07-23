import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as actionCreators from '../actionCreators/GetTaskList';
import { doGet } from '../utils/fetchWrapper';

export function* getGetTaskListRequest() {
  try {
    const response = yield doGet(envConfig.apiEndPoints.getTaskList);
    yield put(actionCreators.getGetTaskListSuccess(response));
  } catch (error) {
    yield put(actionCreators.getGetTaskListFailure(error));
  }
}

export function* getGettasklistWatchers() {
  yield [
    takeLatest('GETTASKLIST_REQUEST', getGetTaskListRequest),
  ];
}
