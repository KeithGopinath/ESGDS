export const getUpdatePasswordRequest = (payload) => ({
  type: 'UPDATE_PASSWORD_REQUEST',
  payload,
});

export function getUpdatePasswordSuccess(updatePassword) {
  return {
    type: 'UPDATE_PASSWORD_SUCCESS',
    updatePassword,
  };
}

export function getUpdatePasswordFailure(error) {
  return {
    type: 'UPDATE_PASSWORD_FAILURE',
    error,
  };
}
