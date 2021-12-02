import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as actionCreators from '../actionCreators/PendingTasks';
import { doGet } from '../utils/fetchWrapper';

export function* pendingTasksGetRequest(data) {
  try {
    const response = yield doGet(`${envConfig.apiEndPoints.getPendingTasksList}/${data.currentTab.replaceAll(' ', '')}/${data.currentRole}?page=${data.newPage + 1}&limit=${data.newRowPerPage}`);
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
