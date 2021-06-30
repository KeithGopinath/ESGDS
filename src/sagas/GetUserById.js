import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as actionCreators from '../actionCreators/GetUserById';
import { doGet } from '../utils/fetchWrapper';

export function* getUserByIdRequest(data) {
  try {
    const response = yield doGet(`${envConfig.apiEndPoints.userUpdate}/${data.userId}`);
    yield put(actionCreators.getUserByIdSuccess(response));
  } catch (error) {
    yield put(actionCreators.getUserByIdFailure(error));
  }
}

export function* getUsersByIdWatchers() {
  yield [
    takeLatest('USER_BY_ID_REQUEST', getUserByIdRequest),
  ];
}
