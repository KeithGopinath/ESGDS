export const pillarWisePercentileSuccess = (pillarWisePercentile) => ({
  type: 'PILLAR_WISE_PERCENTILE_SUCCESS',
  pillarWisePercentile,
});

export const pillarWisePercentileFailure = (error) => ({
  type: 'PILLAR_WISE_PERCENTILE_FAILURE',
  error,
});
