export const pendingTasksGetRequest = () => ({
  type: 'PENDING_TASKS_GET_REQUEST',
});

export const pendingTasksGetSuccess = (pendingTasksList) => ({
  type: 'PENDING_TASKS_GET_SUCCESS',
  pendingTasksList,
});

export const pendingTasksGetFailure = (error) => ({
  type: 'PENDING_TASKS_GET_FAILURE',
  error,
});
