import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as actionCreators from '../actionCreators/GetCompanies';
import * as COMPANY from '../actionTypes/GetCompanies';
import { doGet } from '../utils/fetchWrapper';

export function* getCompanyRequest() {
  try {
    const response = yield doGet(envConfig.apiEndPoints.getCompanylist);
    yield put(actionCreators.getCompanySuccess(response));
  } catch (error) {
    yield put(actionCreators.getCompanyFailure(error));
  }
}

export function* getCompaniesWatchers() {
  yield [
    takeLatest(COMPANY.COMPANY_REQUEST, getCompanyRequest),
  ];
}
