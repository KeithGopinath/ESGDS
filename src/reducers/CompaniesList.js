const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'COMPANY_LIST_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: false,
        companydata: false,
      };
    case 'COMPANY_LIST_SUCCESS':
      return {
        ...state,
        isLoading: false,
        companydata: action.companylist,
      };
    case 'COMPANY_LIST_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
