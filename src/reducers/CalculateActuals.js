const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'CALCULATE_ACTUALS_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: false,
        calculateActuals: false,
      };
    case 'CALCULATE_ACTUALS_SUCCESS':
      return {
        ...state,
        isLoading: false,
        calculateActuals: action.calculateActuals,
      };
    case 'CALCULATE_ACTUALS_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
