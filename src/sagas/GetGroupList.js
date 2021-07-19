import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as actionCreators from '../actionCreators/GetGroupList';
import { doGet } from '../utils/fetchWrapper';

export function* getGroupListRequest() {
  try {
    const response = yield doGet(envConfig.apiEndPoints.getGroupList);
    yield put(actionCreators.getGroupListSuccess(response));
  } catch (error) {
    yield put(actionCreators.getGroupListFailure(error));
  }
}

export function* getGrouplistWatchers() {
  yield [
    takeLatest('GROUPLIST_REQUEST', getGroupListRequest),
  ];
}
