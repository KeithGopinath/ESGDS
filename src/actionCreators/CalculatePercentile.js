export const calculatePercentileSuccess = (calculatePercentile) => ({
  type: 'CALCULATE_PERCENTILE_SUCCESS',
  calculatePercentile,
});

export const calculatePercentileFailure = (error) => ({
  type: 'CALCULATE_PERCENTILE_FAILURE',
  error,
});
