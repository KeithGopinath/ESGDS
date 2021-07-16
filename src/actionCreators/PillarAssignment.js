export const PillarAssignRequest = (pillarinfo) => ({
  type: 'PILLARASSIGN_REQUEST',
  pillarinfo,
});

export const PillarAssignSuccess = (assignpillar) => ({
  type: 'PILLARASSIGN_SUCCESS',
  assignpillar,
});

export const PillarAssignFailure = (error) => ({
  type: 'PILLARASSIGN_FAILURE',
  error,
});
