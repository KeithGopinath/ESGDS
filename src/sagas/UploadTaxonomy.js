import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as actionCreators from '../actionCreators/UploadTaxonomy';
import { doPostFile } from '../utils/fetchWrapper';

export function* uploadTaxonomyRequest(data) {
  try {
    const response = yield doPostFile(envConfig.apiEndPoints.uploadTaxonomy, data.payload);
    yield put(actionCreators.uploadTaxonomySuccess(response));
  } catch (error) {
    yield put(actionCreators.uploadTaxonomyFailure(error));
  }
}

export function* uploadTaxonomyWatchers() {
  yield [
    takeLatest('UPLOAD_TAXONOMY_REQUEST', uploadTaxonomyRequest),
  ];
}
