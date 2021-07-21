import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as actionCreators from '../actionCreators/TaxonomyCompanies';
import { doGet } from '../utils/fetchWrapper';

export function* getTaxonomycompanyRequest(data) {
  try {
    const response = yield doGet(`${envConfig.apiEndPoints.taxonomyCompanies}/${data.payload}`);
    yield put(actionCreators.getTaxonomycompanySuccess(response));
  } catch (error) {
    yield put(actionCreators.getTaxonomycompanyFailure(error));
  }
}

export function* getTaxnomycompanyWatchers() {
  yield [
    takeLatest('TAXANOMYCOMPANY_REQUEST', getTaxonomycompanyRequest),
  ];
}
