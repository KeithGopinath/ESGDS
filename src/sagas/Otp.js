import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as actionCreators from '../actionCreators/Otp';
import { doPost } from '../utils/fetchWrapper';

export function* getOtp(data) {
  try {
    const response = yield doPost(envConfig.apiEndPoints.getOtp, data.otpDetails);
    yield put(actionCreators.getOtpSuccess(response));
    // sessionStorage.access = response.token;
    sessionStorage.access = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwOWFhMGVmMWQ2NGNkMDFlZWRhMDhjOCIsImlhdCI6MTYyNDA0MDk5Mn0.g8SXiJrYLoZvP77R4_JVAjU-DJEoRUyKXCNp8BkS4oo';
  } catch (error) {
    yield put(actionCreators.getOtpFailure(error));
  }
}

export function* otpWatchers() {
  yield [
    takeLatest('OTP_REQUEST', getOtp),
  ];
}
