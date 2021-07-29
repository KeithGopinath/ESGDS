export const createControversyTaskSuccess = (createControversyTask) => ({
  type: 'CREATE_CONTROVERSY_TASK_SUCCESS',
  createControversyTask,
});

export const createControversyTaskFailure = (error) => ({
  type: 'CREATE_CONTROVERSY_TASK_FAILURE',
  error,
});
