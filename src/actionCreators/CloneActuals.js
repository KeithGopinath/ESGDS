export const cloneActualsSuccess = (cloneActuals) => ({
  type: 'CLONE_ACTUALS_SUCCESS',
  cloneActuals,
});

export const cloneActualsFailure = (error) => ({
  type: 'CLONE_ACTUALS_FAILURE',
  error,
});
