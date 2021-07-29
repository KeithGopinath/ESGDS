import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as actionCreators from '../actionCreators/TaskEditDetails';
import { doPost } from '../utils/fetchWrapper';

export function* taskEditDetailsRequest(data) {
  try {
    const response = yield doPost(envConfig.apiEndPoints.taskEditDetails, data.payload);
    yield put(actionCreators.taskEditDetailsSuccess(response));
  } catch (error) {
    yield put(actionCreators.taskEditDetailsFailure(error));
  }
}

export function* taskEditDetailsWatchers() {
  yield [
    takeLatest('TASKEDITDETAILS_REQUEST', taskEditDetailsRequest),
  ];
}
