import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as actionCreators from '../actionCreators/DpCodeData';
import { doGet } from '../utils/fetchWrapper';

export function* dpCodeDataGetRequest(data) {
  try {
    const response = yield doGet(`${envConfig.apiEndPoints.getDpCodeData}/${data.taskId}/${data.dpCodeId}`);
    yield put(actionCreators.dpCodeDataGetSuccess(response));
  } catch (error) {
    yield put(actionCreators.dpCodeDataGetFailure(error));
  }
}

export function* getDpCodeDataWatchers() {
  yield [
    takeLatest('DPCODEDATA_GET_REQUEST', dpCodeDataGetRequest),
  ];
}
