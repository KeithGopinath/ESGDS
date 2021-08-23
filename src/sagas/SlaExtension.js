import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as actionCreators from '../actionCreators/SlaExtension';
import { doPost } from '../utils/fetchWrapper';

export function* SlaExtensionRequest(data) {
  try {
    // eslint-disable-next-line no-sequences
    const response = yield doPost(envConfig.apiEndPoints.slaExtension, data.payload);
    yield put(actionCreators.SlaExtensionSuccess(response));
  } catch (error) {
    yield put(actionCreators.SlaExtensionFailure(error));
  }
}

export function* getSlaExtensionWatchers() {
  yield [
    takeLatest('SLA_EXTENSION_REQUEST', SlaExtensionRequest),
  ];
}
