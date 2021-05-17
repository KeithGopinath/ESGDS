import * as ESGDS from './../actionTypes/Employee';

const initialState = { };

export default (state = initialState, action) => {
  switch (action.type) {
    case ESGDS.EMPLOYEE_REQUEST:
      return {
        ...state,
        isLoading: true,
        employee: false,
        error: false,
      };
    case ESGDS.EMPLOYEE_SUCCESS:
      return {
        ...state,
        isLoading: true,
        employee: action.employee,
      };
    case ESGDS.EMPLOYEE_FAILURE:
      return {
        ...state,
        isLoading: true,
        error: action.error,
      };
    default:
      return state;
  }
};
