import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as forgotPasswordActionCreators from '../actionCreators/ForgotPassword';
import { doPost } from '../utils/fetchWrapper';

export function* getForgotPasswordRequest(data) {
  try {
    const response = yield doPost(envConfig.apiEndPoints.getForgotPassword, data.payload);
    yield put(forgotPasswordActionCreators.getForgotPasswordSuccess(response));
  } catch (error) {
    yield put(forgotPasswordActionCreators.getForgotPasswordFailure(error));
  }
}

export function* forgotPasswordWatchers() {
  yield [
    takeLatest('FORGOT_PASSWORD_REQUEST', getForgotPasswordRequest),
  ];
}
