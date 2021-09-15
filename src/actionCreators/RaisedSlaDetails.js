export const raisedslaRequest = (taskid) => ({
  type: 'RAISEDSLA_REQUEST',
  taskid,
});

export const raisedslaSuccess = (raised) => ({
  type: 'RAISEDSLA_SUCCESS',
  raised,
});

export const raisedslaFailure = (error) => ({
  type: 'RAISEDSLA_FAILURE',
  error,
});
