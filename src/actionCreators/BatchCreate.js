export const BatchCreateRequest = (batchinfo) => ({
  type: 'BATCH_CREATE_REQUEST',
  batchinfo,
});

export const BatchCreateSuccess = (createbatch) => ({
  type: 'BATCH_CREATE_SUCCESS',
  createbatch,
});

export const BatchCreateFailure = (error) => ({
  type: 'BATCH_CREATE_FAILURE',
  error,
});
