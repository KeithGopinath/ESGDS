import * as EMPLOYEE from './../actionTypes/Employee';

export function getEmployee(employeeDetails) {
  return {
    type: EMPLOYEE.EMPLOYEE_REQUEST,
    employeeDetails,
  };
}

export function getEmployeeSuccess(employee) {
  return {
    type: EMPLOYEE.EMPLOYEE_SUCCESS,
    employee,
  };
}

export function getEmployeeFailure(error) {
  return {
    type: EMPLOYEE.EMPLOYEE_FAILURE,
    error,
  };
}
