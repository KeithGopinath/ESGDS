import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as updatePasswordActionCreators from '../actionCreators/UpdatePassword';
import { doPut } from '../utils/fetchWrapper';

export function* getUpdatePasswordRequest(data) {
  try {
    const response = yield doPut(`${envConfig.apiEndPoints.getForgotPassword}/${data.token}`, data.payload);
    yield put(updatePasswordActionCreators.getUpdatePasswordSuccess(response));
  } catch (error) {
    yield put(updatePasswordActionCreators.getUpdatePasswordFailure(error));
  }
}

export function* updatePasswordWatchers() {
  yield [
    takeLatest('UPDATE_PASSWORD_REQUEST', getUpdatePasswordRequest),
  ];
}
