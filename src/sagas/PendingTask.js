import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as actionCreators from '../actionCreators/PendingTasks';
import { doGet } from '../utils/fetchWrapper';

export function* pendingTasksGetRequest() {
  try {
    const response = yield doGet(envConfig.apiEndPoints.getPendingTasksList);
    yield put(actionCreators.pendingTasksGetSuccess(response));
  } catch (error) {
    yield put(actionCreators.pendingTasksGetFailure(error));
  }
}

export function* getPendingTasksWatchers() {
  yield [
    takeLatest('PENDING_TASKS_GET_REQUEST', pendingTasksGetRequest),
  ];
}
