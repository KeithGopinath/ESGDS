export const rejectslaRequest = (slaId) => ({
  type: 'REJECTSLA_REQUEST',
  slaId,
});

export const rejectslaSuccess = (rejected) => ({
  type: 'REJECTSLA_SUCCESS',
  rejected,
});

export const rejectslaFailure = (error) => ({
  type: 'REJECTSLA_FAILURE',
  error,
});
