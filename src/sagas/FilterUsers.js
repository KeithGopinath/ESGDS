import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as actionCreators from '../actionCreators/FilterUsers';
import { doPost } from '../utils/fetchWrapper';

export function* getFilterUsersRequest(data) {
  try {
    const response = yield doPost(envConfig.apiEndPoints.getFilterUsers, data.payload);
    yield put(actionCreators.getFilterUsersSuccess(response));
  } catch (error) {
    yield put(actionCreators.getFilterUsersFailure(error));
  }
}

export function* filterUsersWatchers() {
  yield [
    takeLatest('FILTER_USERS_REQUEST', getFilterUsersRequest),
  ];
}
