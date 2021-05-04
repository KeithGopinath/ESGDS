import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as actionCreators from '../actionCreators/ForgotPassword';
import { doPost } from '../utils/fetchWrapper';

export function* getForgotPasswordRequest(data) {
  try {
    const response = yield doPost(envConfig.apiEndPoints.getForgotPassword, data.payload);
    yield put(actionCreators.getForgotPasswordSuccess(response));
  } catch (error) {
    yield put(actionCreators.getForgotPasswordFailure(error));
  }
}

export function* forgotPasswordWatchers() {
  yield [
    takeLatest('FORGOT_PASSWORD_REQUEST', getForgotPasswordRequest),
  ];
}
