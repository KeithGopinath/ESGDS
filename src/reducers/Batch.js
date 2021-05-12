import * as BATCH from './../actionTypes/Batch';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case BATCH.BATCH_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: false,
        batchdata: false,
      };
    case BATCH.BATCH_SUCCESS:
      return {
        ...state,
        isLoading: true,
        batchdata: action.batchlist,
      };
    case BATCH.BATCH_FAILURE:
      return {
        ...state,
        isLoading: true,
        error: action.error,
      };
    default:
      return state;
  }
};
