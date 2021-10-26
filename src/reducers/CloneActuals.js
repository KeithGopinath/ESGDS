const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'CLONE_ACTUALS_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: false,
        cloneActuals: false,
      };
    case 'CLONE_ACTUALS_SUCCESS':
      return {
        ...state,
        isLoading: false,
        cloneActuals: action.cloneActuals,
      };
    case 'CLONE_ACTUALS_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
