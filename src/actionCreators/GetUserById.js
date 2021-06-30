export const getUserByIdSuccess = (userById) => ({
  type: 'USER_BY_ID_SUCCESS',
  userById,
});

export const getUserByIdFailure = (error) => ({
  type: 'USER_BY_ID_FAILURE',
  error,
});
