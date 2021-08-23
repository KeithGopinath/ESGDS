import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as actionCreators from '../actionCreators/DerivedDataCalculation';
import { doPost } from '../utils/fetchWrapper';

export function* derivedCalculationPostRequest(data) {
  try {
    const response = yield doPost(envConfig.apiEndPoints.postDerivedDataCalculation, data.payload);
    yield put(actionCreators.derivedCalculationPostSuccess(response));
  } catch (error) {
    yield put(actionCreators.derivedCalculationPostFailure(error));
  }
}

export function* derivedDataCalculationWatchers() {
  yield [
    takeLatest('DERIVED_CALCULATION_POST_REQUEST', derivedCalculationPostRequest),
  ];
}
