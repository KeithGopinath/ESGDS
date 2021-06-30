import { put, takeLatest, all } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as actionCreators from '../actionCreators/Login';
import { doPost } from '../utils/fetchWrapper';

export function* getLogin(data) {
  try {
    const response = yield doPost(envConfig.apiEndPoints.getLogin, data.loginDetails);
    yield put(actionCreators.getLoginSuccess(response));
    if (response.user.role !== 'admin') {
      sessionStorage.access = response.token;
    }
    sessionStorage.role = response.user.name;
  } catch (error) {
    yield put(actionCreators.getLoginFailure(error));
  }
}

// all is to be researched
export function* loginWatchers() {
  yield all([
    takeLatest('LOGIN_REQUEST', getLogin),
  ]);
}
