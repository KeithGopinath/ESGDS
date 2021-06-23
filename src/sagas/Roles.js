import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as actionCreators from '../actionCreators/Roles';
import { doGet } from '../utils/fetchWrapper';

export function* getRolesRequest() {
  try {
    const response = yield doGet(envConfig.apiEndPoints.getRoles);
    yield put(actionCreators.getRolesSuccess(response));
  } catch (error) {
    yield put(actionCreators.getRolesFailure(error));
  }
}

export function* getRolesWatchers() {
  yield [
    takeLatest('GET_ROLES_REQUEST', getRolesRequest),
  ];
}
