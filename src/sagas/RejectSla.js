import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as actionCreators from '../actionCreators/RejectSla';
import { doPut } from '../utils/fetchWrapper';

export function* rejectslaRequest(data) {
  try {
    const response = yield doPut(`${envConfig.apiEndPoints.rejectsla}/${data.slaId}`);
    yield put(actionCreators.rejectslaSuccess(response));
  } catch (error) {
    yield put(actionCreators.rejectslaFailure(error));
  }
}

export function* rejectslaWatchers() {
  yield [
    takeLatest('REJECTSLA_REQUEST', rejectslaRequest),
  ];
}
