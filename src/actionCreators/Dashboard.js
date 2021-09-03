export const getDashboardSuccess = (dashboard) => ({
  type: 'GET_DASHBOARD_SUCCESS',
  dashboard,
});

export const getDashboardFailure = (error) => ({
  type: 'GET_DASHBOARD_FAILURE',
  error,
});
