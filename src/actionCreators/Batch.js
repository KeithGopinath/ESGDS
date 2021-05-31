export const getBatchRequest = () => ({
  type: 'BATCH_REQUEST',
});

export function getBatchSuccess(batchlist) {
  return {
    type: 'BATCH_SUCCESS',
    batchlist,
  };
}

export function getBatchFailure(error) {
  return {
    type: 'BATCH_FAILURE',
    error,
  };
}
