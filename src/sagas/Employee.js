import { put, takeLatest } from 'redux-saga/effects';
import envConfig from 'envConfig'; //eslint-disable-line
import * as employeeActionCreators from '../actionCreators/Employee';
import { doPost } from '../utils/fetchWrapper';

export function* getEmployee(data) {
  try {
    const response = yield doPost(envConfig.apiEndPoints.getEmployee, data.employeeDetails);
    yield put(employeeActionCreators.getEmployeeSuccess(response));
  } catch (error) {
    yield put(employeeActionCreators.getEmployeeFailure(error));
  }
}

export function* employeeWatchers() {
  yield [
    takeLatest('EMPLOYEE_REQUEST', getEmployee),
  ];
}
