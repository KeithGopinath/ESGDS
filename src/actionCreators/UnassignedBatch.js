export const getUnassignedBatchRequest = (payload) => ({
  type: 'UNASSIGNEDBATCH_REQUEST',
  payload,
});

export const getUnassignedBatchSuccess = (unassignedbatchlist) => ({
  type: 'UNASSIGNEDBATCH_SUCCESS',
  unassignedbatchlist,
});

export const getUnassignedBatchFailure = (error) => ({
  type: 'UNASSIGNEDBATCH_FAILURE',
  error,
});
