import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as actionCreators from '../actionCreators/UnassignedBatch';
import { doGet } from '../utils/fetchWrapper';

export function* getUnassignedBatchRequest() {
  try {
    const response = yield doGet(envConfig.apiEndPoints.unassignedBatches);
    yield put(actionCreators.getUnassignedBatchSuccess(response));
  } catch (error) {
    yield put(actionCreators.getUnassignedBatchFailure(error));
  }
}

export function* getunassignedBatchWatchers() {
  yield [
    takeLatest('UNASSIGNEDBATCH_REQUEST', getUnassignedBatchRequest),
  ];
}
