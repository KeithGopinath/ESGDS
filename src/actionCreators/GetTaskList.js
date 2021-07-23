export const getGetTaskListRequest = () => ({
  type: 'GETTASKLIST_REQUEST',
});

export const getGetTaskListSuccess = (tasklist) => ({
  type: 'GETTASKLIST_SUCCESS',
  tasklist,
});

export const getGetTaskListFailure = (error) => ({
  type: 'GETTASKLIST_FAILURE',
  error,
});
