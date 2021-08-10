const initialState = {};
export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_REPORTS_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: false,
        reports: false,
      };
    case 'GET_REPORTS_SUCCESS':
      return {
        ...state,
        isLoading: false,
        reports: action.reports,
      };
    case 'GET_REPORTS_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
