import * as ESGDS from './../actionTypes/Employee';

export function getEmployee(employeeDetails) {
  return {
    type: ESGDS.EMPLOYEE_REQUEST,
    employeeDetails,
  };
}

export function getEmployeeSuccess(employee) {
  return {
    type: ESGDS.EMPLOYEE_SUCCESS,
    employee,
  };
}

export function getEmployeeFailure(error) {
  return {
    type: ESGDS.EMPLOYEE_FAILURE,
    error,
  };
}
