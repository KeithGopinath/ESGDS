import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as actionCreators from '../actionCreators/NewClientTaxonomy';
import { doPost } from '../utils/fetchWrapper';

export function* newClientTaxonomyRequest(data) {
  try {
    const response = yield doPost(envConfig.apiEndPoints.newClientTaxonomy, data.payload);
    yield put(actionCreators.newClientTaxonomySuccess(response));
  } catch (error) {
    yield put(actionCreators.newClientTaxonomyFailure(error));
  }
}

export function* newClientTaxonomyWatchers() {
  yield [
    takeLatest('NEW_CLIENT_TAXONOMY_REQUEST', newClientTaxonomyRequest),
  ];
}
