export const ControversyUpdateRequest = (payload) => ({
  type: 'CONTROVERSY_UPDATE_REQUEST',
  payload,
});

export const ControversyUpdateSuccess = (update) => ({
  type: 'CONTROVERSY_UPDATE_SUCCESS',
  update,
});

export const ControversyUpdateFailure = (error) => ({
  type: 'CONTROVERSY_UPDATE_FAILURE',
  error,
});
