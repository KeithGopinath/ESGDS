export const getFilterUsersRequest = (payload) => ({
  type: 'FILTER_USERS_REQUEST',
  payload,
});

export const getFilterUsersSuccess = (filterUsers) => ({
  type: 'FILTER_USERS_SUCCESS',
  filterUsers,
});

export const getFilterUsersFailure = (error) => ({
  type: 'FILTER_USERS_FAILURE',
  error,
});
