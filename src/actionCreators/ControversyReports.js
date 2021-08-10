export const getControversyReports = () => ({
  type: 'GET_CONTROVERSY_REPORTS_REQUEST',
});

export const getControversyReportsSuccess = (reportsControversy) => ({
  type: 'GET_CONTROVERSY_REPORTS_SUCCESS',
  reportsControversy,
});

export const getControversyReportsFailure = (error) => ({
  type: 'GET_CONTROVERSY_REPORTS_FAILURE',
  error,
});
