import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as otpActionCreators from '../actionCreators/Otp';
import { doPost } from '../utils/fetchWrapper';

export function* getOtp(data) {
  try {
    const response = yield doPost(envConfig.apiEndPoints.getOtp, data.otpDetails);
    yield put(otpActionCreators.getOtpSuccess(response));
  } catch (error) {
    yield put(otpActionCreators.getOtpFailure(error));
  }
}

export function* otpWatchers() {
  yield [
    takeLatest('OTP_REQUEST', getOtp),
  ];
}
