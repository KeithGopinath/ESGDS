import * as ESGDS from '../actionTypes/BatchCreate';

export const BatchCreateRequest = () => ({
  type: ESGDS.BATCH_CREATE_REQUEST,
});

export function BatchCreateSuccess(createbatch) {
  return {
    type: ESGDS.BATCH_CREATE_SUCCESS,
    createbatch,
  };
}

export function BatchCreateFailure(error) {
  return {
    type: ESGDS.BATCH_CREATE_FAILURE,
    error,
  };
}
