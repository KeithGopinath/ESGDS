import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as actionCreators from '../actionCreators/MatrixMember';
import { doPost, doGet } from '../utils/fetchWrapper';

export function* addNewMemberPostRequest(data) {
  try {
    let apiEndPoint;
    if (data.memberType === 'Board') {
      apiEndPoint = envConfig.apiEndPoints.postAddNewBoardMatrixMember;
    }
    if (data.memberType === 'Kmp') {
      apiEndPoint = envConfig.apiEndPoints.postAddNewKmpMatrixMember;
    }
    const response = yield doPost(apiEndPoint, data.payload);
    yield put(actionCreators.addNewMemberPostSuccess(response));
  } catch (error) {
    yield put(actionCreators.addNewMemberPostFailure(error));
  }
}

export function* activeMembersPostRequest(data) {
  try {
    let apiEndPoint;
    if (data.memberType === 'Board') {
      apiEndPoint = envConfig.apiEndPoints.getActiveBoardMatrixMembers;
    }
    if (data.memberType === 'Kmp') {
      apiEndPoint = envConfig.apiEndPoints.getActiveKmpMatrixMembers;
    }
    const response = yield doGet(`${apiEndPoint}/${data.companyId}`);
    yield put(actionCreators.activeMembersPostSuccess(response));
  } catch (error) {
    yield put(actionCreators.activeMembersPostFailure(error));
  }
}

export function* terminateMembersPostRequest(data) {
  try {
    let apiEndPoint;
    if (data.memberType === 'Board') {
      apiEndPoint = envConfig.apiEndPoints.postTerminateBoardMatrixMembers;
    }
    if (data.memberType === 'Kmp') {
      apiEndPoint = envConfig.apiEndPoints.postTerminateKmpMatrixMembers;
    }
    const response = yield doPost(apiEndPoint, data.payload);
    yield put(actionCreators.terminateMembersPostSuccess(response));
  } catch (error) {
    yield put(actionCreators.terminateMembersPostFailure(error));
  }
}


export function* matrixMemberWatchers() {
  yield [
    takeLatest('ADD_NEW_MEMBER_POST_REQUEST', addNewMemberPostRequest),
    takeLatest('ACTIVE_MEMBERS_GET_REQUEST', activeMembersPostRequest),
    takeLatest('TERMINATE_MEMBERS_POST_REQUEST', terminateMembersPostRequest),
  ];
}
