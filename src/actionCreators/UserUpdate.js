export const userUpdateSuccess = (userUpdate) => ({
  type: 'USER_UPDATE_SUCCESS',
  userUpdate,
});

export const userUpdateFailure = (error) => ({
  type: 'USER_UPDATE_FAILURE',
  error,
});
