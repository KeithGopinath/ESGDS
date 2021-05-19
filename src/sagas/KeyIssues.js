import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as actionCreators from '../actionCreators/KeyIssues';
import { KEYISSUES_REQUEST } from './../actionTypes/KeyIssues';

import { doGet } from '../utils/fetchWrapper';

export function* getKeyIssuesRequest() {
  try {
    const response = yield doGet(`${envConfig.apiEndPoints.getKeyIssues}?access_token=${sessionStorage.access}`);
    yield put(actionCreators.getKeyIssuesSuccess(response));
  } catch (error) {
    yield put(actionCreators.getKeyIssuesFailure(error));
  }
}

export function* getKeyIssuesWatchers() {
  yield [
    takeLatest(KEYISSUES_REQUEST, getKeyIssuesRequest),
  ];
}
