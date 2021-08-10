const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'CALCULATE_PERCENTILE_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: false,
        calculatePercentile: false,
      };
    case 'CALCULATE_PERCENTILE_SUCCESS':
      return {
        ...state,
        isLoading: false,
        calculatePercentile: action.calculatePercentile,
      };
    case 'CALCULATE_PERCENTILE_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
