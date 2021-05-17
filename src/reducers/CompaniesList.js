import * as ESGDS from './../actionTypes/CompaniesList';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case ESGDS.COMPANY_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: false,
        companydata: false,
      };
    case ESGDS.COMPANY_LIST_SUCCESS:
      return {
        ...state,
        isLoading: true,
        companydata: action.companylist,
      };
    case ESGDS.COMPANY_LIST_FAILURE:
      return {
        ...state,
        isLoading: true,
        error: action.error,
      };
    default:
      return state;
  }
};
