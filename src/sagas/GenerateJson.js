import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as actionCreators from '../actionCreators/GenerateJson';
import { doPost } from '../utils/fetchWrapper';

export function* generateJsonRequest(data) {
  try {
    const response = yield doPost(envConfig.apiEndPoints.generateJson, data.payload);
    yield put(actionCreators.generateJsonSuccess(response));
  } catch (error) {
    yield put(actionCreators.generateJsonFailure(error));
  }
}

export function* generateJsonWatchers() {
  yield [
    takeLatest('GENERATE_JSON_REQUEST', generateJsonRequest),
  ];
}
