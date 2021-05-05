import * as COMPANY from './../actionTypes/Company';

const initialState = { };

export default (state = initialState, action) => {
  switch (action.type) {
    case COMPANY.COMPANY_REQUEST:
      return {
        ...state,
        isLoading: true,
        company: false,
        error: false,
      };
    case COMPANY.COMPANY_SUCCESS:
      return {
        ...state,
        isLoading: true,
        company: action.company,
      };
    case COMPANY.COMPANY_FAILURE:
      return {
        ...state,
        isLoading: true,
        error: action.error,
      };
    default:
      return state;
  }
};
