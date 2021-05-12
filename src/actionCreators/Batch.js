import * as BATCH from '../actionTypes/Batch';

export const getBatchRequest = () => ({
  type: BATCH.BATCH_REQUEST,
});

export function getBatchSuccess(batchlist) {
  return {
    type: BATCH.BATCH_SUCCESS,
    batchlist,
  };
}

export function getBatchFailure(error) {
  return {
    type: BATCH.BATCH_FAILURE,
    error,
  };
}
