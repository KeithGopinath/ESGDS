import * as ESGDS from '../actionTypes/Batch';

export const getBatchRequest = () => ({
  type: ESGDS.BATCH_REQUEST,
});

export function getBatchSuccess(batchlist) {
  return {
    type: ESGDS.BATCH_SUCCESS,
    batchlist,
  };
}

export function getBatchFailure(error) {
  return {
    type: ESGDS.BATCH_FAILURE,
    error,
  };
}
