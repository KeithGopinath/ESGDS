import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as actionCreators from '../actionCreators/MasterTaxonomy';
import { doGet } from '../utils/fetchWrapper';

export function* getMasterTaxonomyRequest() {
  try {
    const response = yield doGet(envConfig.apiEndPoints.getMasterTaxonomy);
    yield put(actionCreators.getMasterTaxonomySuccess(response));
  } catch (error) {
    yield put(actionCreators.getMasterTaxonomyFailure(error));
  }
}

export function* getMasterTaxonomyWatchers() {
  yield [
    takeLatest('MASTER_TAXONOMY_REQUEST', getMasterTaxonomyRequest),
  ];
}
