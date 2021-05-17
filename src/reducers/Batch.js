import * as ESGDS from './../actionTypes/Batch';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case ESGDS.BATCH_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: false,
        batchdata: false,
      };
    case ESGDS.BATCH_SUCCESS:
      return {
        ...state,
        isLoading: true,
        batchdata: action.batchlist,
      };
    case ESGDS.BATCH_FAILURE:
      return {
        ...state,
        isLoading: true,
        error: action.error,
      };
    default:
      return state;
  }
};
