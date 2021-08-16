const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'BATCH_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: false,
        batchdata: false,
      };
    case 'BATCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        batchdata: action.batchlist,
      };
    case 'BATCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
