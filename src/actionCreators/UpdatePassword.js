import * as UPDATE from './../actionTypes/UpdatePassword';

export const getUpdatePasswordRequest = (payload) => ({
  type: UPDATE.UPDATE_PASSWORD_REQUEST,
  payload,
});

export function getUpdatePasswordSuccess(updatePassword) {
  return {
    type: UPDATE.UPDATE_PASSWORD_SUCCESS,
    updatePassword,
  };
}

export function getUpdatePasswordFailure(error) {
  return {
    type: UPDATE.UPDATE_PASSWORD_FAILURE,
    error,
  };
}
