import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as actionCreators from '../actionCreators/DpCodeValidation';
import { doGet } from '../utils/fetchWrapper';

export function* dpCodeValidationGetRequest(data) {
  try {
    const response = yield doGet(`${envConfig.apiEndPoints.getDpCodeValidation}/${data.taskId}/${data.previousYear}`);
    yield put(actionCreators.dpCodeValidationGetSuccess(response));
  } catch (error) {
    yield put(actionCreators.dpCodeValidationGetFailure(error));
  }
}

export function* getDpCodeValidationhWatchers() {
  yield [
    takeLatest('DPCODE_VALIDATION_GET_REQUEST', dpCodeValidationGetRequest),
  ];
}
