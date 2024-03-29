/*eslint-disable*/
import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as actionCreators from '../actionCreators/Otp';
import { doPost } from '../utils/fetchWrapper';

export function* getOtp(data) {
  try {
    const response = yield doPost(envConfig.apiEndPoints.getOtp, data.otpDetails);
    yield put(actionCreators.getOtpSuccess(response));
    sessionStorage.access = response.token;
    sessionStorage.role = response.user.roleDetails.primaryRole.label;
    sessionStorage.userId = response.user._id;
    sessionStorage.userName = response.user && response.user.name;
  } catch (error) {
    yield put(actionCreators.getOtpFailure(error));
  }
}

export function* otpWatchers() {
  yield [
    takeLatest('OTP_REQUEST', getOtp),
  ];
}
