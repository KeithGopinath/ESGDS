import * as EMPLOYEE from './../actionTypes/Employee';

const initialState = { };

export default (state = initialState, action) => {
  switch (action.type) {
    case EMPLOYEE.EMPLOYEE_REQUEST:
      return {
        ...state,
        isLoading: true,
        employee: false,
        error: false,
      };
    case EMPLOYEE.EMPLOYEE_SUCCESS:
      return {
        ...state,
        isLoading: true,
        employee: action.employee,
      };
    case EMPLOYEE.EMPLOYEE_FAILURE:
      return {
        ...state,
        isLoading: true,
        error: action.error,
      };
    default:
      return state;
  }
};
