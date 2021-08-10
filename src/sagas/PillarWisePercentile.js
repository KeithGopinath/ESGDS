import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as actionCreators from '../actionCreators/PillarWisePercentile';
import { doPost } from '../utils/fetchWrapper';

export function* pillarWisePercentileRequest(data) {
  try {
    const response = yield doPost(envConfig.apiEndPoints.pillarWisePercentile, data.payload);
    yield put(actionCreators.pillarWisePercentileSuccess(response));
  } catch (error) {
    yield put(actionCreators.pillarWisePercentileFailure(error));
  }
}

export function* pillarWisePercentileWatchers() {
  yield [
    takeLatest('PILLAR_WISE_PERCENTILE_REQUEST', pillarWisePercentileRequest),
  ];
}
