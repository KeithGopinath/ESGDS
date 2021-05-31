export const getForgotPasswordRequest = (payload) => ({
  type: 'FORGOT_PASSWORD_REQUEST',
  payload,
});

export function getForgotPasswordSuccess(forgotPassword) {
  return {
    type: 'FORGOT_PASSWORD_SUCCESS',
    forgotPassword,
  };
}

export function getForgotPasswordFailure(error) {
  return {
    type: 'FORGOT_PASSWORD_FAILURE',
    error,
  };
}
