export const getGetTaskListRequest = () => ({
  type: 'GET_TASKLIST_REQUEST',
});

export const getGetTaskListSuccess = (tasklist) => ({
  type: 'GET_TASKLIST_SUCCESS',
  tasklist,
});

export const getGetTaskListFailure = (error) => ({
  type: 'GET_TASKLIST_FAILURE',
  error,
});
