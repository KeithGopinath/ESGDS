import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as actionCreators from '../actionCreators/OnSelectPillar';
import { doPost } from '../utils/fetchWrapper';

export function* onSelectPillarRequest(data) {
  try {
    // eslint-disable-next-line no-sequences
    const response = yield doPost(envConfig.apiEndPoints.onSelectpillar, data.payload);
    yield put(actionCreators.onSelectPillarSuccess(response));
  } catch (error) {
    yield put(actionCreators.onSelectPillarFailure(error));
  }
}

export function* gettaskpillatWatchers() {
  yield [
    takeLatest('ONSELECTPILLAR_REQUEST', onSelectPillarRequest),
  ];
}
