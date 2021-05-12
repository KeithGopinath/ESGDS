import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as clientActionCreators from '../actionCreators/Client';
import { doPost } from '../utils/fetchWrapper';

export function* getClient(data) {
  try {
    const response = yield doPost(envConfig.apiEndPoints.getClient, data.clientDetails);
    yield put(clientActionCreators.getClientSuccess(response));
  } catch (error) {
    yield put(clientActionCreators.getClientFailure(error));
  }
}

export function* clientWatchers() {
  yield [
    takeLatest('CLIENT_REQUEST', getClient),
  ];
}
