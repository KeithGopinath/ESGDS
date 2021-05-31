export const getLogin = (loginDetails) => ({
  type: 'LOGIN_REQUEST',
  loginDetails,
});

export function getLoginSuccess(login) {
  return {
    type: 'LOGIN_SUCCESS',
    login,
  };
}

export function getLoginFailure(error) {
  return {
    type: 'LOGIN_FAILURE',
    error,
  };
}
