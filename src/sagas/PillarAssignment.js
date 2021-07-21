import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as actionCreators from '../actionCreators/PillarAssignment';
import { doPost } from '../utils/fetchWrapper';

export function* PillarAssignRequest(data) {
  try {
    // eslint-disable-next-line no-sequences
    const response = yield doPost(envConfig.apiEndPoints.pillarAssignment, data.payload);
    yield put(actionCreators.PillarAssignSuccess(response));
  } catch (error) {
    yield put(actionCreators.PillarAssignFailure(error));
  }
}

export function* getPillarassignWatchers() {
  yield [
    takeLatest('PILLARASSIGN_REQUEST', PillarAssignRequest),
  ];
}
