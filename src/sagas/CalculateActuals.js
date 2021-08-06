import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as actionCreators from '../actionCreators/CalculateActuals';
import { doPost } from '../utils/fetchWrapper';

export function* calculateActualsRequest(data) {
  try {
    const response = yield doPost(envConfig.apiEndPoints.calculateActuals, data.payload);
    yield put(actionCreators.calculateActualsSuccess(response));
  } catch (error) {
    yield put(actionCreators.calculateActualsFailure(error));
  }
}

export function* calculateActualsWatchers() {
  yield [
    takeLatest('CALCULATE_ACTUALS_REQUEST', calculateActualsRequest),
  ];
}
