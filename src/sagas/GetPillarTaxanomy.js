import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as actionCreators from '../actionCreators/GetPillarTaxanomy';
import { doPost } from '../utils/fetchWrapper';

export function* getPillarTaxonomyRequest(data) {
  try {
    const response = yield doPost(envConfig.apiEndPoints.getpillarTaxonomy, data.payload);
    yield put(actionCreators.getPillarTaxonomySuccess(response));
  } catch (error) {
    yield put(actionCreators.getPillarTaxonomyFailure(error));
  }
}

export function* getpillarWatchers() {
  yield [
    takeLatest('PILLARTAXANOMY_REQUEST', getPillarTaxonomyRequest),
  ];
}
