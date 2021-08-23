export const derivedCalculationPostRequest = () => ({
  type: 'DERIVED_CALCULATION_POST_REQUEST',
});

export const derivedCalculationPostSuccess = (calculation) => ({
  type: 'DERIVED_CALCULATION_POST_SUCCESS',
  calculation,
});

export const derivedCalculationPostFailure = (error) => ({
  type: 'DERIVED_CALCULATION_POST_FAILURE',
  error,
});
