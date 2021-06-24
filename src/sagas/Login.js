import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as actionCreators from '../actionCreators/Login';
import { doPost } from '../utils/fetchWrapper';

export function* getLogin(data) {
  try {
    const response = yield doPost(envConfig.apiEndPoints.getLogin, data.loginDetails);
    yield put(actionCreators.getLoginSuccess(response));
    if (response.user.role !== 'admin') {
      // sessionStorage.access = response.token;
      sessionStorage.access = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwOWFhMGVmMWQ2NGNkMDFlZWRhMDhjOCIsImlhdCI6MTYyNDA0MDk5Mn0.g8SXiJrYLoZvP77R4_JVAjU-DJEoRUyKXCNp8BkS4oo';
    }
    sessionStorage.role = response.user.role;
  } catch (error) {
    yield put(actionCreators.getLoginFailure(error));
  }
}

export function* loginWatchers() {
  yield [
    takeLatest('LOGIN_REQUEST', getLogin),
  ];
}
