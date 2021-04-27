import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as loginActionCreators from '../actionCreators/Login';
import { doPost } from '../utils/fetchWrapper';

export function* getLogin(data) {
  try {
    const response = yield doPost(envConfig.apiEndPoints.getLogin, data.loginDetails);
    yield put(loginActionCreators.getLoginSuccess(response));
  } catch (error) {
    yield put(loginActionCreators.getLoginFailure(error));
  }
}

export function* loginWatchers() {
  yield [
    takeLatest('LOGIN_REQUEST', getLogin),
  ];
}
