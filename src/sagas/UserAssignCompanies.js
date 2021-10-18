/*eslint-disable*/ 
import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as actionCreators from '../actionCreators/UserAssignCompanies';
import { doPut } from '../utils/fetchWrapper';

export function* UserAssignCompanies(data) {
  console.log("data", data);
  try {
    const response = yield doPut(envConfig.apiEndPoints.UserAssingCompanies, data.Payload);
    yield put(actionCreators.UserAssignCompaniesSuccess(response));
  } catch (error) {
    yield put(actionCreators.UserAssignCompaniesFailure(error));
  }
}

export function* userAssignCompaniesWatcher() {
  yield [
    takeLatest('USER_ASSIGN_COMPANIES_REQUEST', UserAssignCompanies),
  ];
}

