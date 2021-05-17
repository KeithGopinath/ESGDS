import * as ESGDS from './../actionTypes/ForgotPassword';

export const getForgotPasswordRequest = (payload) => ({
  type: ESGDS.FORGOT_PASSWORD_REQUEST,
  payload,
});

export function getForgotPasswordSuccess(forgotPassword) {
  return {
    type: ESGDS.FORGOT_PASSWORD_SUCCESS,
    forgotPassword,
  };
}

export function getForgotPasswordFailure(error) {
  return {
    type: ESGDS.FORGOT_PASSWORD_FAILURE,
    error,
  };
}
