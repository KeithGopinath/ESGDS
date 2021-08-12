import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as actionCreators from '../actionCreators/ControversyTaskList';
import { doPost } from '../utils/fetchWrapper';

export function* controversyTaskListRequest(data) {
  try {
    const response = yield doPost(envConfig.apiEndPoints.controversyTaskList, data);
    yield put(actionCreators.controversyTaskListSuccess(response));
  } catch (error) {
    yield put(actionCreators.controversyTaskListFailure(error));
  }
}

export function* controversyTaskListWatchers() {
  yield [
    takeLatest('CONTROVERSY_TASK_LIST_REQUEST', controversyTaskListRequest),
  ];
}
