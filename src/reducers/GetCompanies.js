import * as COMPANY from './../actionTypes/GetCompanies';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case COMPANY.COMPANY_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: false,
        companydata: false,
      };
    case COMPANY.COMPANY_SUCCESS:
      return {
        ...state,
        isLoading: true,
        companydata: action.companylist,
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
