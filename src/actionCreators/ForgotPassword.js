import * as FORGOT from './../actionTypes/ForgotPassword';

export const getForgotPasswordRequest = (payload) => ({
  type: FORGOT.FORGOT_PASSWORD_REQUEST,
  payload,
});

export function getForgotPasswordSuccess(forgotPassword) {
  return {
    type: FORGOT.FORGOT_PASSWORD_SUCCESS,
    forgotPassword,
  };
}

export function getForgotPasswordFailure(error) {
  return {
    type: FORGOT.FORGOT_PASSWORD_FAILURE,
    error,
  };
}
