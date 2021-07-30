export const getPillarTaxonomyRequest = (payload) => ({
  type: 'PILLARTAXANOMY_REQUEST',
  payload,
});

export const getPillarTaxonomySuccess = (pillarlist) => ({
  type: 'PILLARTAXANOMY_SUCCESS',
  pillarlist,
});

export const getPillarTaxonomyFailure = (error) => ({
  type: 'PILLARTAXANOMY_FAILURE',
  error,
});
