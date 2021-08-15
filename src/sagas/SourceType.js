import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as actionCreators from '../actionCreators/SourceType';
import { doGet, doPost } from '../utils/fetchWrapper';

export function* sourceTypeGetRequest() {
  try {
    const response = yield doGet(envConfig.apiEndPoints.getSourceType);
    yield put(actionCreators.sourceTypeGetSuccess(response));
  } catch (error) {
    yield put(actionCreators.sourceTypeGetFailure(error));
  }
}

export function* sourceTypePostRequest(data) {
  try {
    const response = yield doPost(envConfig.apiEndPoints.postSourceType, data.sourceTypeData);
    yield put(actionCreators.sourceTypePostSuccess(response));
  } catch (error) {
    yield put(actionCreators.sourceTypePostFailure(error));
  }
}

export function* companySourceTypesGetRequest(data) {
  try {
    const response = yield doGet(`${envConfig.apiEndPoints.getCompanySourceTypes}/?companyId=${data.companyId}`);
    yield put(actionCreators.companySourceTypesGetSuccess(response));
  } catch (error) {
    yield put(actionCreators.companySourceTypesGetFailure(error));
  }
}

export function* sourceTypeWatchers() {
  yield [
    takeLatest('SOURCE_TYPE_GET_REQUEST', sourceTypeGetRequest),
    takeLatest('SOURCE_TYPE_POST_REQUEST', sourceTypePostRequest),
    takeLatest('COMPANY_SOURCE_TYPES_GET_REQUEST', companySourceTypesGetRequest),
  ];
}
