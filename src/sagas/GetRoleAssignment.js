import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as actionCreators from '../actionCreators/GetRoleAssignment';
import { doPost } from '../utils/fetchWrapper';

export function* getRoleAssignmentRequest(data) {
  try {
    const response = yield doPost(envConfig.apiEndPoints.getFilterUsers, data.payload);
    yield put(actionCreators.getRoleAssignmentSuccess(response));
  } catch (error) {
    yield put(actionCreators.getRoleAssignmentFailure(error));
  }
}

export function* roleAssignmentWatchers() {
  yield [
    takeLatest('ROLE_ASSIGNMENT_REQUEST', getRoleAssignmentRequest),
  ];
}
