export const updateTaskRequest = (payload) => ({
  type: 'UPDATETASK_REQUEST',
  payload,
});

export const updateTaskSuccess = (taskupdate) => ({
  type: 'UPDATETASK_SUCCESS',
  taskupdate,
});

export const updateTaskFailure = (error) => ({
  type: 'UPDATETASK_FAILURE',
  error,
});
