import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as actionCreators from '../actionCreators/RaisedSlaDetails';
import { doGet } from '../utils/fetchWrapper';

export function* raisedslaRequest(data) {
  try {
    const response = yield doGet(`${envConfig.apiEndPoints.raisedSla}/${data.taskid}`);
    yield put(actionCreators.raisedslaSuccess(response));
  } catch (error) {
    yield put(actionCreators.raisedslaFailure(error));
  }
}

export function* raisedslaWatchers() {
  yield [
    takeLatest('RAISEDSLA_REQUEST', raisedslaRequest),
  ];
}
