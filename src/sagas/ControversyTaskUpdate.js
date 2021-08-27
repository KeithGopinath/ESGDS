import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as actionCreators from '../actionCreators/ControversyTaskUpdate';
import { doPost } from '../utils/fetchWrapper';

export function* ControversyUpdateRequest(data) {
  try {
    // eslint-disable-next-line no-sequences
    const response = yield doPost(envConfig.apiEndPoints.controversyUpdate, data.payload);
    yield put(actionCreators.ControversyUpdateSuccess(response));
  } catch (error) {
    yield put(actionCreators.ControversyUpdateFailure(error));
  }
}

export function* getControversyUpdateWatchers() {
  yield [
    takeLatest('CONTROVERSY_UPDATE_REQUEST', ControversyUpdateRequest),
  ];
}
