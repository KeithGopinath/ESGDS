import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as actionCreators from '../actionCreators/CompaniesList';
import { doGet } from '../utils/fetchWrapper';

export function* getCompanyListRequest() {
  try {
    const response = yield doGet(`${envConfig.apiEndPoints.getCompanylist}?access_token=${sessionStorage.access}`);
    yield put(actionCreators.getCompanyListSuccess(response));
  } catch (error) {
    yield put(actionCreators.getCompanyListFailure(error));
  }
}

export function* companyListWatchers() {
  yield [
    takeLatest('COMPANY_LIST_REQUEST', getCompanyListRequest),
  ];
}
