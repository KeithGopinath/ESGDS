import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as actionCreators from '../actionCreators/UpdateTask';
import { doPut } from '../utils/fetchWrapper';

export function* updateTaskRequest(data) {
  try {
    const response = yield doPut(envConfig.apiEndPoints.updateTask, data.payload);
    yield put(actionCreators.updateTaskSuccess(response));
  } catch (error) {
    yield put(actionCreators.updateTaskFailure(error));
  }
}

export function* taskUpdateWatchers() {
  yield [
    takeLatest('UPDATETASK_REQUEST', updateTaskRequest),
  ];
}
