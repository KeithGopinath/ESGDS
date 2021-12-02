import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as actionCreators from '../actionCreators/Reports';
import { doGet } from '../utils/fetchWrapper';

export function* getReportsRequest(data) {
  try {
    const response = yield doGet(`${envConfig.apiEndPoints.getReports}/${data.role}`);
    yield put(actionCreators.getReportsSuccess(response));
  } catch (error) {
    yield put(actionCreators.getReportsFailure(error));
  }
}

export function* getReportsWatchers() {
  yield [
    takeLatest('GET_REPORTS_REQUEST', getReportsRequest),
  ];
}

// Future server pagination
// pending reportList
// export function* getPendingReportlist(data) {
//   try {
//     const response = yield doGet(`${envConfig.apiEndPoints.pendingReportlist}/${data.role}/?page=${data.newPage + 1}&limit=${data.newRowPerPage}`);
//     yield put(actionCreators.getPendingReportListSuccess(response));
//   } catch (error) {
//     yield put(actionCreators.getPendingReportListFailure(error));
//   }
// }

// // completed reportList
// export function* getCompletedReportList(data) {
//   try {
//     const response = yield doGet(`${envConfig.apiEndPoints.completedReportlist}/${data.role}/?page=${data.newPage + 1}&limit=${data.newRowPerPage}`);
//     // const response = yield doGet(envConfig.apiEndPoints.completedTasklist);
//     yield put(actionCreators.getCompletedReportListSuccess(response));
//   } catch (error) {
//     yield put(actionCreators.getCompletedReportListFailure(error));
//   }
// }

// // controversy
// export function* getControversyReportList(data) {
//   try {
//     // const response = yield doGet(envConfig.apiEndPoints.contorversyTasklist);
//     const response = yield doGet(`${envConfig.apiEndPoints.contorversyReportlist}/${data.role}/?page=${data.newPage + 1}&limit=${data.newRowPerPage}`);
//     yield put(actionCreators.getControversyReportListSuccess(response));
//   } catch (error) {
//     yield put(actionCreators.getControversyReportListFailure(error));
//   }
// }

// // pending reportList watcher
// export function* getReportlistWatchers() {
//   yield [
//     takeLatest('GET_PENDING_REPORTLIST_REQUEST', getPendingReportlist),
//     takeLatest('GET_COMPLETED_REPORTLIST_REQUEST', getCompletedReportList),
//     takeLatest('GET_CONTROVERSY_REPORTLIST_REQUEST', getControversyReportList),
//   ];
// }
