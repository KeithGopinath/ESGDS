import * as ESGDS from './../actionTypes/UpdatePassword';

export const getUpdatePasswordRequest = (payload) => ({
  type: ESGDS.UPDATE_PASSWORD_REQUEST,
  payload,
});

export function getUpdatePasswordSuccess(updatePassword) {
  return {
    type: ESGDS.UPDATE_PASSWORD_SUCCESS,
    updatePassword,
  };
}

export function getUpdatePasswordFailure(error) {
  return {
    type: ESGDS.UPDATE_PASSWORD_FAILURE,
    error,
  };
}
