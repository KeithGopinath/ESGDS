const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_DASHBOARD_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: false,
        dashboard: false,
      };
    case 'GET_DASHBOARD_SUCCESS':
      return {
        ...state,
        isLoading: false,
        dashboard: action.dashboard,
      };
    case 'GET_DASHBOARD_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
