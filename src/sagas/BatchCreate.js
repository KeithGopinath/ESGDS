import { all, put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as actionCreators from '../actionCreators/BatchCreate';
import { doPost } from '../utils/fetchWrapper';

export function* BatchCreateRequest() {
  try {
    const response = yield doPost(envConfig.apiEndPoints.createBatch);
    yield put(actionCreators.BatchCreateSuccess(response));
  } catch (error) {
    yield put(actionCreators.BatchCreateFailure(error));
  }
}

export function* getCreateBatchWatchers() {
  yield all([
    takeLatest('BATCH_CREATE_REQUEST', BatchCreateRequest),
  ]);
}
