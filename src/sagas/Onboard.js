import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as actionCreators from '../actionCreators/Onboard';
import { doPost } from '../utils/fetchWrapper';

export function* getOnboard(data) {
  try {
    const response = yield doPost(envConfig.apiEndPoints.getOnboard, data.onboardingData);
    yield put(actionCreators.getOnboardSuccess(response));
  } catch (error) {
    yield put(actionCreators.getOnboardFailure(error));
  }
}

export function* onboardWatchers() {
  yield [
    takeLatest('ONBOARD_REQUEST', getOnboard),
  ];
}
