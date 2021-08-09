import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as actionCreators from '../actionCreators/MasterTaxonomy';
import { doGet, doPost, doPut } from '../utils/fetchWrapper';

export function* getMasterTaxonomyRequest() {
  try {
    const response = yield doGet(envConfig.apiEndPoints.getMasterTaxonomy);
    yield put(actionCreators.getMasterTaxonomySuccess(response));
  } catch (error) {
    yield put(actionCreators.getMasterTaxonomyFailure(error));
  }
}

export function* getMasterTaxonomyHeaderRequest(data) {
  const { id } = data.header;
  try {
    const response = id ? yield doPut(`${envConfig.apiEndPoints.getMasterTaxonomyHeader}/${id}`, data.column) : yield doPost(envConfig.apiEndPoints.getMasterTaxonomyHeader, data.column); // const response = yield doPost(envConfig.apiEndPoints.getMasterTaxonomyHeader, data.column);
    yield put(actionCreators.getMasterTaxonomyHeaderSuccess(response));
  } catch (error) {
    yield put(actionCreators.getMasterTaxonomyHeaderFailure(error));
  }
}

export function* getMasterTaxonomyWatchers() {
  yield [
    takeLatest('MASTER_TAXONOMY_REQUEST', getMasterTaxonomyRequest),
    takeLatest('MASTER_TAXONOMY_HEADER_REQUEST', getMasterTaxonomyHeaderRequest),
  ];
}
