import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as actionCreators from '../actionCreators/RoleAssignmentEdit';
import { doPut } from '../utils/fetchWrapper';

export function* roleAssignmentEditRequest(data) {
  try {
    const response = yield doPut(envConfig.apiEndPoints.roleAssignmentEdit, data.payload);
    yield put(actionCreators.roleAssignmentEditSuccess(response));
  } catch (error) {
    yield put(actionCreators.roleAssignmentEditFailure(error));
  }
}

export function* roleAssignmentEditWatchers() {
  yield [
    takeLatest('ROLE_ASSIGNMENT_EDIT_REQUEST', roleAssignmentEditRequest),
  ];
}
