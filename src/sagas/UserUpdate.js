import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as actionCreators from '../actionCreators/UserUpdate';
import { doPut } from '../utils/fetchWrapper';

export function* userUpdateRequest(data) {
  try {
    const response = yield doPut(envConfig.apiEndPoints.userUpdate, data.payload);
    yield put(actionCreators.userUpdateSuccess(response));
  } catch (error) {
    yield put(actionCreators.userUpdateFailure(error));
  }
}

export function* userUpdateWatchers() {
  yield [
    takeLatest('USER_UPDATE_REQUEST', userUpdateRequest),
  ];
}
