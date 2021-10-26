import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as actionCreators from '../actionCreators/CloneActuals';
import { doPost } from '../utils/fetchWrapper';

export function* cloneActualsRequest(data) {
  try {
    const response = yield doPost(envConfig.apiEndPoints.cloneActuals, data.payload);
    yield put(actionCreators.cloneActualsSuccess(response));
  } catch (error) {
    yield put(actionCreators.cloneActualsFailure(error));
  }
}

export function* cloneActualsWatchers() {
  yield [
    takeLatest('CLONE_ACTUALS_REQUEST', cloneActualsRequest),
  ];
}
