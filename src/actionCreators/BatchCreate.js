export const BatchCreateRequest = () => ({
  type: 'BATCH_CREATE_REQUEST',
});

export function BatchCreateSuccess(createbatch) {
  return {
    type: 'BATCH_CREATE_SUCCESS',
    createbatch,
  };
}

export function BatchCreateFailure(error) {
  return {
    type: 'BATCH_CREATE_FAILURE',
    error,
  };
}
