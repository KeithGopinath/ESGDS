import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as actionCreators from '../actionCreators/GetRoleAssignment';
import { doGet } from '../utils/fetchWrapper';

export function* getRoleAssignmentRequest() {
  try {
    const response = yield doGet(envConfig.apiEndPoints.getRoleAssignment);
    yield put(actionCreators.getRoleAssignmentSuccess(response));
  } catch (error) {
    yield put(actionCreators.getRoleAssignmentFailure(error));
  }
}

export function* getRoleAssignmentWatchers() {
  yield [
    takeLatest('GET_ROLE_ASSIGNMENT_REQUEST', getRoleAssignmentRequest),
  ];
}
