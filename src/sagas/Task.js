import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as actionCreators from '../actionCreators/Task';
import { doGet, doPut } from '../utils/fetchWrapper';

export function* taskGetRequest(data) {
  try {
    const response = yield doGet(`${envConfig.apiEndPoints.getTask}/${data.taskId}`);
    yield put(actionCreators.taskGetSuccess(response));
  } catch (error) {
    yield put(actionCreators.taskGetFailure(error));
  }
}

export function* controversyTaskGetRequest(data) {
  try {
    const response = yield doGet(`${envConfig.apiEndPoints.getControversyTask}/${data.taskId}`);
    yield put(actionCreators.controversyTaskGetSuccess(response));
  } catch (error) {
    yield put(actionCreators.controversyTaskGetFailure(error));
  }
}

export function* taskSubmitPostRequest(data) {
  try {
    const response = yield doPut(`${envConfig.apiEndPoints.taskSubmitPost}`, data.payload);
    yield put(actionCreators.taskSubmitPostSuccess(response));
  } catch (error) {
    yield put(actionCreators.taskSubmitPostFailure(error));
  }
}

export function* taskWatchers() {
  yield [
    takeLatest('TASK_GET_REQUEST', taskGetRequest),
    takeLatest('CONTROVERSY_TASK_GET_REQUEST', controversyTaskGetRequest),
    takeLatest('TASK_SUBMIT_POST_REQUEST', taskSubmitPostRequest),
  ];
}
