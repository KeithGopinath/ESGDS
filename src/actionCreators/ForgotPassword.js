export const getForgotPasswordRequest = (payload) => ({
  type: 'FORGOT_PASSWORD_REQUEST',
  payload,
});

export const getForgotPasswordSuccess = (forgotPassword) => ({
  type: 'FORGOT_PASSWORD_SUCCESS',
  forgotPassword,
});

export const getForgotPasswordFailure = (error) => ({
  type: 'FORGOT_PASSWORD_FAILURE',
  error,
});
