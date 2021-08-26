export const dpCodeValidationGetRequest = () => ({
  type: 'DPCODE_VALIDATION_GET_REQUEST',
});

export const dpCodeValidationGetSuccess = (validation) => ({
  type: 'DPCODE_VALIDATION_GET_SUCCESS',
  validation,
});

export const dpCodeValidationGetFailure = (error) => ({
  type: 'DPCODE_VALIDATION_GET_FAILURE',
  error,
});
