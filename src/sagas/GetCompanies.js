import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as GetCompaniesActionCreators from '../actionCreators/GetCompanies';
import * as COMPANY from '../actionTypes/GetCompanies';
import { doGET } from '../utils/fetchWrapper';

export function* getCompanyRequest() {
  try {
    const response = yield doGET(envConfig.apiEndPoints.getCompanylist);
    yield put(GetCompaniesActionCreators.getCompanySuccess(response));
  } catch (error) {
    yield put(GetCompaniesActionCreators.getCompanyFailure(error));
  }
}

export function* getCompaniesWatchers() {
  yield [
    takeLatest(COMPANY.COMPANY_REQUEST, getCompanyRequest),
  ];
}
