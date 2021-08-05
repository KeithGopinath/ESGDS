export const calculateActualsSuccess = (calculateActuals) => ({
  type: 'CALCULATE_ACTUALS_SUCCESS',
  calculateActuals,
});

export const calculateActualsFailure = (error) => ({
  type: 'CALCULATE_ACTUALS_FAILURE',
  error,
});
