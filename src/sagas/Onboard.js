import { all, put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as actionCreators from '../actionCreators/Onboard';
import { doPostFile } from '../utils/fetchWrapper';

export function* getOnboard(data) {
  try {
    const response = yield doPostFile(envConfig.apiEndPoints.getOnboard, data.formData);
    yield put(actionCreators.getOnboardSuccess(response));
  } catch (error) {
    yield put(actionCreators.getOnboardFailure(error));
  }
}

export function* onboardWatchers() {
  yield all([
    takeLatest('ONBOARD_REQUEST', getOnboard),
  ]);
}
