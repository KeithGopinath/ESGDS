import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as actionCreators from '../actionCreators/SubsetTaxonomyDownload';
import { doGet } from '../utils/fetchWrapper';

export function* subsetTaxonomyDownloadGetRequest(data) {
  try {
    const response = yield doGet(`${envConfig.apiEndPoints.getSubsetTaxonomyDownload}/${data.subsetTaxonomyId}`);
    yield put(actionCreators.subsetTaxonomyDownloadGetSuccess(response));
  } catch (error) {
    yield put(actionCreators.subsetTaxonomyDownloadGetFailure(error));
  }
}

export function* getSubsetTaxonomyDownloadWatchers() {
  yield [
    takeLatest('SUBSET_TAXONOMY_DOWNLOAD_GET_REQUEST', subsetTaxonomyDownloadGetRequest),
  ];
}
