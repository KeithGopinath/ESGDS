import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as actionCreators from '../actionCreators/ReportsTaskList';
import { doPost } from '../utils/fetchWrapper';

export function* getReportsTaskListRequest(data) {
  try {
    if (data.companyTaskReports) {
      const response = yield doPost(envConfig.apiEndPoints.getReportsTaskList, data);
      yield put(actionCreators.getReportsTaskListSuccess(response));
    } else if (data.controversyTaskReports) {
      const response = yield doPost(envConfig.apiEndPoints.controversyTaskReports, data);
      yield put(actionCreators.getReportsTaskListSuccess(response));
    }
  } catch (error) {
    yield put(actionCreators.getReportsTaskListFailure(error));
  }
}

export function* getReportsTaskListWatchers() {
  yield [
    takeLatest('GET_REPORTS_TASKLIST_REQUEST', getReportsTaskListRequest),
  ];
}
