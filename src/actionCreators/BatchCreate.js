export const BatchCreateRequest = () => ({
  type: 'BATCH_CREATE_REQUEST',
});

export const BatchCreateSuccess = (createbatch) => ({
  type: 'BATCH_CREATE_SUCCESS',
  createbatch,
});

export const BatchCreateFailure = (error) => ({
  type: 'BATCH_CREATE_FAILURE',
  error,
});
