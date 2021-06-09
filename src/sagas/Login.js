import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as actionCreators from '../actionCreators/Login';
import { doPost } from '../utils/fetchWrapper';

export function* getLogin(data) {
  try {
    const response = yield doPost(envConfig.apiEndPoints.getLogin, data.loginDetails);
    yield put(actionCreators.getLoginSuccess(response));
    sessionStorage.role = response.user.roleId.roleName;
  } catch (error) {
    yield put(actionCreators.getLoginFailure(error));
  }
}

export function* loginWatchers() {
  yield [
    takeLatest('LOGIN_REQUEST', getLogin),
  ];
}
