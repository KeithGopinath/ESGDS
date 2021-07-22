import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as actionCreators from '../actionCreators/UploadCompanies';
import { doPost } from '../utils/fetchWrapper';

export function* uploadCompaniesRequest(data) {
  try {
    const response = yield doPost(envConfig.apiEndPoints.uploadCompanies, data.payload);
    yield put(actionCreators.uploadCompaniesSuccess(response));
  } catch (error) {
    yield put(actionCreators.uploadCompaniesFailure(error));
  }
}

export function* uploadCompaniesWatchers() {
  yield [
    takeLatest('UPLOAD_COMPANIES_REQUEST', uploadCompaniesRequest),
  ];
}
