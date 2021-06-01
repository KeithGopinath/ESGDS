export const getBatchRequest = () => ({
  type: 'BATCH_REQUEST',
});

export const getBatchSuccess = (batchlist) => ({
  type: 'BATCH_SUCCESS',
  batchlist,
});

export const getBatchFailure = (error) => ({
  type: 'BATCH_FAILURE',
  error,
});
