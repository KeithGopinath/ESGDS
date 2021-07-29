import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as actionCreators from '../actionCreators/GetControversyTaskData';
import { doGet } from '../utils/fetchWrapper';

export function* getControversyTaskDataRequest(data) {
  try {
    const response = yield doGet(`${envConfig.apiEndPoints.getControversyTaskData}/${data.payload}`);
    yield put(actionCreators.getControversyTaskDataSuccess(response));
  } catch (error) {
    yield put(actionCreators.getControversyTaskDataFailure(error));
  }
}

export function* getControversyTaskDataWatchers() {
  yield [
    takeLatest('CONTROVERSY_TASK_DATA_REQUEST', getControversyTaskDataRequest),
  ];
}
