import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as actionCreators from '../actionCreators/ClientTaxonomy';
import { doGet } from '../utils/fetchWrapper';

export function* getClientTaxonomyRequest() {
  try {
    const response = yield doGet(`${envConfig.apiEndPoints.clientTaxonomy}?access_token=${sessionStorage.access}`);
    yield put(actionCreators.getClientTaxonomySuccess(response));
  } catch (error) {
    yield put(actionCreators.getClientTaxonomyFailure(error));
  }
}

export function* getClientTaxonomyWatchers() {
  yield [
    takeLatest('ClientTaxonomy_REQUEST', getClientTaxonomyRequest),
  ];
}
