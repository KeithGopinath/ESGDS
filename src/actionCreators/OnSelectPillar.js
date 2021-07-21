export const onSelectPillarRequest = (taskpillar) => ({
  type: 'ONSELECTPILLAR_REQUEST',
  taskpillar,
});

export const onSelectPillarSuccess = (pillar) => ({
  type: 'ONSELECTPILLAR_SUCCESS',
  pillar,
});

export const onSelectPillarFailure = (error) => ({
  type: 'ONSELECTPILLAR_FAILURE',
  error,
});
