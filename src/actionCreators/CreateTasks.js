export const CreateTaskRequest = (taskinfo) => ({
  type: 'CREATE_TASK_REQUEST',
  taskinfo,
});

export const CreateTaskSuccess = (taskresponse) => ({
  type: 'CREATE_TASK_SUCCESS',
  taskresponse,
});

export const CreateTaskFailure = (error) => ({
  type: 'CREATE_TASK_FAILURE',
  error,
});
