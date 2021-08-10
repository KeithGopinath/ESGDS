import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as actionCreators from '../actionCreators/CalculatePercentile';
import { doPost } from '../utils/fetchWrapper';

export function* calculatePercentileRequest(data) {
  try {
    const response = yield doPost(envConfig.apiEndPoints.calculatePercentile, data.payload);
    yield put(actionCreators.calculatePercentileSuccess(response));
  } catch (error) {
    yield put(actionCreators.calculatePercentileFailure(error));
  }
}

export function* calculatePercentileWatchers() {
  yield [
    takeLatest('CALCULATE_PERCENTILE_REQUEST', calculatePercentileRequest),
  ];
}
