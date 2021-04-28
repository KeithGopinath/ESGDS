import * as ESGDS from './../actionTypes/Login';

export const getLogin = (loginDetails) => ({
  type: ESGDS.LOGIN_REQUEST,
  loginDetails,
});

export function getLoginSuccess(login) {
  return {
    type: ESGDS.LOGIN_SUCCESS,
    login,
  };
}

export function getLoginFailure(error) {
  return {
    type: ESGDS.LOGIN_FAILURE,
    error,
  };
}
