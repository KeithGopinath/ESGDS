import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as actionCreators from '../actionCreators/TaskListAssign';
import { doGet } from '../utils/fetchWrapper';

// pending taskList
export function* getPendingTaskList() {
  try {
    const response = yield doGet(envConfig.apiEndPoints.pendingTasklist);
    yield put(actionCreators.getPendingTaskListSuccess(response));
  } catch (error) {
    yield put(actionCreators.getPendingTaskListFailure(error));
  }
}

// completed TaskList
export function* getCompletedTaskList() {
  try {
    const response = yield doGet(envConfig.apiEndPoints.completedTasklist);
    yield put(actionCreators.getCompletedTaskListSuccess(response));
  } catch (error) {
    yield put(actionCreators.getCompletedTaskListFailure(error));
  }
}

// controversy
export function* getControversyTaskList() {
  try {
    const response = yield doGet(envConfig.apiEndPoints.contorversyTasklist);
    yield put(actionCreators.getControversyTaskListSuccess(response));
  } catch (error) {
    yield put(actionCreators.getControversyTaskListFailure(error));
  }
}

// pending taskList watcher
export function* getPendingTasklistWatchers() {
  yield [
    takeLatest('GET_PENDING_TASKLIST_REQUEST', getPendingTaskList),
  ];
}

// completed taskList watcher
export function* getCompletedTasklistWatchers() {
  yield [
    takeLatest('GET_COMPLETED_TASKLIST_REQUEST', getCompletedTaskList),
  ];
}

// controversy taskList watcher
export function* getControversyTasklistWatchers() {
  yield [
    takeLatest('GET_CONTROVERSY_TASKLIST_REQUEST', getControversyTaskList),
  ];
}
