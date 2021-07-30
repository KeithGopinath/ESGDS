export const getReports = () => ({
  type: 'GET_REPORTS_REQUEST',
});

export const getReportsSuccess = (reports) => ({
  type: 'GET_REPORTS_SUCCESS',
  reports,
});

export const getReportsFailure = (error) => ({
  type: 'GET_REPORTS_FAILURE',
  error,
});
