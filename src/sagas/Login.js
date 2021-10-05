/*eslint-disable*/
import { put, takeLatest, all } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as actionCreators from '../actionCreators/Login';
import { doPost } from '../utils/fetchWrapper';

export function* getLogin(data) {
  try {
    const response = yield doPost(envConfig.apiEndPoints.getLogin, data.loginDetails);
    yield put(actionCreators.getLoginSuccess(response));
    sessionStorage.access = response.token;
    sessionStorage.role = response.user && response.user.roleDetails.primaryRole.label;
    sessionStorage.userId = response.user && response.user._id;
    { response.user && response.user.roleDetails.primaryRole.label === 'SuperAdmin' ? null : sessionStorage.userName = response.user && response.user.name }
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
