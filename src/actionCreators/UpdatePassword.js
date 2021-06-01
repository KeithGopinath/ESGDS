export const getUpdatePasswordRequest = (payload) => ({
  type: 'UPDATE_PASSWORD_REQUEST',
  payload,
});

export const getUpdatePasswordSuccess = (updatePassword) => ({
  type: 'UPDATE_PASSWORD_SUCCESS',
  updatePassword,
});

export const getUpdatePasswordFailure = (error) => ({
  type: 'UPDATE_PASSWORD_FAILURE',
  error,
});
