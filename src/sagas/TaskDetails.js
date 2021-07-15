import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as actionCreators from '../actionCreators/TaskDetails';
import { doGet } from '../utils/fetchWrapper';

export function* getTaskdetailsRequest() {
  try {
    const response = yield doGet(envConfig.apiEndPoints.gettaskDetails);
    yield put(actionCreators.getTaskdetailsSuccess(response));
  } catch (error) {
    yield put(actionCreators.getTaskdetailsFailure(error));
  }
}

export function* getTaskDetailsWatchers() {
  yield [
    takeLatest('TASKDETAILS_REQUEST', getTaskdetailsRequest),
  ];
}
