import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as companyActionCreators from '../actionCreators/Company';
import { doPostFile } from '../utils/fetchWrapper';

export function* getCompany(data) {
  try {
    const response = yield doPostFile(envConfig.apiEndPoints.getCompany, data.formData);
    yield put(companyActionCreators.getCompanySuccess(response));
  } catch (error) {
    yield put(companyActionCreators.getCompanyFailure(error));
  }
}

export function* companyWatchers() {
  yield [
    takeLatest('COMPANY_REQUEST', getCompany),
  ];
}
