const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'PILLAR_WISE_PERCENTILE_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: false,
        pillarWisePercentile: false,
      };
    case 'PILLAR_WISE_PERCENTILE_SUCCESS':
      return {
        ...state,
        isLoading: false,
        pillarWisePercentile: action.pillarWisePercentile,
      };
    case 'PILLAR_WISE_PERCENTILE_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case 'PILLAR_WISE_PERCENTILE_RESET':
      return {
        ...state,
        isLoading: false,
        error: false,
        pillarWisePercentile: false,
      };
    default:
      return state;
  }
};
