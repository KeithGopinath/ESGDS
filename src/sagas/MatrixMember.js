import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as actionCreators from '../actionCreators/MatrixMember';
import { doPut } from '../utils/fetchWrapper';

export function* matrixMemberPutRequest(data) {
  try {
    const response = yield doPut(envConfig.apiEndPoints.putMatrixMember, data.payload);
    yield put(actionCreators.matrixMemberPutSuccess(response));
  } catch (error) {
    yield put(actionCreators.matrixMemberPutFailure(error));
  }
}

export function* matrixMemberWatchers() {
  yield [
    takeLatest('MATRIX_MEMBER_PUT_REQUEST', matrixMemberPutRequest),
  ];
}
