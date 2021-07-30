export const getControversyTaskDataSuccess = (controversyTaskData) => ({
  type: 'CONTROVERSY_TASK_DATA_SUCCESS',
  controversyTaskData,
});

export const getControversyTaskDataFailure = (error) => ({
  type: 'CONTROVERSY_TASK_DATA_FAILURE',
  error,
});
