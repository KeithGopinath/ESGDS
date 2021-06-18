export const getRolesRequest = () => ({
  type: 'GET_ROLES_REQUEST',
});

export const getRolesSuccess = (roles) => ({
  type: 'GET_ROLES_SUCCESS',
  roles,
});

export const getRolesFailure = (error) => ({
  type: 'GET_ROLES_FAILURE',
  error,
});
