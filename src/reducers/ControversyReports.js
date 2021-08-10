const initialState = {};
export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_CONTROVERSY_REPORTS_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: false,
        reportsControversy: false,
      };
    case 'GET_CONTROVERSY_REPORTS_SUCCESS':
      return {
        ...state,
        isLoading: false,
        reportsControversy: action.reportsControversy,
      };
    case 'GET_CONTROVERSY_REPORTS_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
