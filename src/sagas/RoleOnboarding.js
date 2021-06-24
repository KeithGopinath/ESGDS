/*eslint-disable*/
import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as actionCreators from '../actionCreators/RoleOnboarding';
import { doPost } from '../utils/fetchWrapper';

export function* getRoleOnboarding(data) {
  try {
    if (data.roleOnboardingData.emailList) {
    console.log('email list data', data.roleOnboardingData);
      const response = yield doPost(envConfig.apiEndPoints.getRoleListOnboarding, data.roleOnboardingData);
      yield put(actionCreators.getRoleOnboardingSuccess(response));
    } else if (data.roleOnboardingData.emailFile) {
    console.log('email file data', data.roleOnboardingData);
      const response = yield doPost(envConfig.apiEndPoints.getRoleFileOnboarding, data.roleOnboardingData);
      yield put(actionCreators.getRoleOnboardingSuccess(response));
    }
  } catch (error) {
    yield put(actionCreators.getRoleOnboardingFailure(error));
  }
}

export function* roleOnboarddingWatchers() {
  yield [
    takeLatest('ROLE_ONBOARDING_REQUEST', getRoleOnboarding),
  ];
}
