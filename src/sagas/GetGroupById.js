import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as actionCreators from '../actionCreators/GetGroupById';
import { doGet } from '../utils/fetchWrapper';

export function* getGroupByIdRequest(data) {
  try {
    const response = yield doGet(`${envConfig.apiEndPoints.getGroupList}/${data.groupid}`);
    yield put(actionCreators.getGroupByIdSuccess(response));
  } catch (error) {
    yield put(actionCreators.getGroupByIdFailure(error));
  }
}

export function* getGroupbyidWatchers() {
  yield [
    takeLatest('GROUPBYID_REQUEST', getGroupByIdRequest),
  ];
}
