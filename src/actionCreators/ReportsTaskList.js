export const getReportsTaskList = () => ({
  type: 'GET_REPORTS_TASKLIST_REQUEST',
});

export const getReportsTaskListSuccess = (reportsTaskList) => ({
  type: 'GET_REPORTS_TASKLIST_SUCCESS',
  reportsTaskList,
});

export const getReportsTaskListFailure = (error) => ({
  type: 'GET_REPORTS_TASKLIST_FAILURE',
  error,
});
