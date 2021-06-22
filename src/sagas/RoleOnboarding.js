import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as actionCreators from '../actionCreators/RoleOnboarding';
import { doPost } from '../utils/fetchWrapper';

export function* getRoleOnboarding(data) {
  try {
    const response = yield doPost(envConfig.apiEndPoints.getRoleOnboarding, data.roleOnboardingData);
    yield put(actionCreators.getRoleOnboardingSuccess(response));
  } catch (error) {
    yield put(actionCreators.getRoleOnboardingFailure(error));
  }
}

export function* onboardWatchers() {
  yield [
    takeLatest('ROLE_ONBOARDING_REQUEST', getRoleOnboarding),
  ];
}
