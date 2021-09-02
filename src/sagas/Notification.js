import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as actionCreators from '../actionCreators/Notification';
import { doGet } from '../utils/fetchWrapper';

export function* getNotificationRequest(data) {
  try {
    const response = yield doGet(`${envConfig.apiEndPoints.getNotification}/${data.userId}`);
    yield put(actionCreators.getNotificationSuccess(response));
  } catch (error) {
    yield put(actionCreators.getNotificationFailure(error));
  }
}

export function* getNotificationWatchers() {
  yield [
    takeLatest('NOTIFICATION_REQUEST', getNotificationRequest),
  ];
}
