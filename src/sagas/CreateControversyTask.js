import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as actionCreators from '../actionCreators/CreateControversyTask';
import { doPost } from '../utils/fetchWrapper';

export function* createControversyTaskRequest(data) {
  try {
    const response = yield doPost(envConfig.apiEndPoints.createControversyTask, data.payload);
    yield put(actionCreators.createControversyTaskSuccess(response));
  } catch (error) {
    yield put(actionCreators.createControversyTaskFailure(error));
  }
}

export function* createControversyTaskWatchers() {
  yield [
    takeLatest('CREATE_CONTROVERSY_TASK_REQUEST', createControversyTaskRequest),
  ];
}
