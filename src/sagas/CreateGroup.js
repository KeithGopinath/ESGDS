import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as actionCreators from '../actionCreators/CreateGroup';
import { doPost } from '../utils/fetchWrapper';

export function* CreateGroupRequest(data) {
  try {
    // eslint-disable-next-line no-sequences
    const response = yield doPost(envConfig.apiEndPoints.createGroup, data.payload);
    yield put(actionCreators.CreateGroupSuccess(response));
  } catch (error) {
    yield put(actionCreators.CreateGroupFailure(error));
  }
}

export function* getCreateGroupWatchers() {
  yield [
    takeLatest('GROUP_CREATE_REQUEST', CreateGroupRequest),
  ];
}
