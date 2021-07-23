import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as actionCreators from '../actionCreators/BatchCreate';
import { doPost } from '../utils/fetchWrapper';

export function* CreateTaskRequest(data) {
  try {
    // eslint-disable-next-line no-sequences
    const response = yield doPost(envConfig.apiEndPoints.createTask, data.payload);
    yield put(actionCreators.CreateTaskSuccess(response));
  } catch (error) {
    yield put(actionCreators.CreateTaskFailure(error));
  }
}

export function* getCreateTaskWatchers() {
  yield [
    takeLatest('CREATE_TASK_REQUEST', CreateTaskRequest),
  ];
}