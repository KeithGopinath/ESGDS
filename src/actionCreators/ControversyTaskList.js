export const controversyTaskListSuccess = (controversyTaskList) => ({
  type: 'CONTROVERSY_TASK_LIST_SUCCESS',
  controversyTaskList,
});

export const controversyTaskListFailure = (error) => ({
  type: 'CONTROVERSY_TASK_LIST_FAILURE',
  error,
});
