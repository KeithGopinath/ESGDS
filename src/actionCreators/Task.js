export const taskGetRequest = () => ({
  type: 'TASK_GET_REQUEST',
});

export const taskGetSuccess = (task) => ({
  type: 'TASK_GET_SUCCESS',
  task,
});

export const taskGetFailure = (error) => ({
  type: 'TASK_GET_FAILURE',
  error,
});

export const taskSubmitPostRequest = () => ({
  type: 'TASK_SUBMIT_POST_REQUEST',
});

export const taskSubmitPostSuccess = (task) => ({
  type: 'TASK_SUBMIT_POST_SUCCESS',
  task,
});

export const taskSubmitPostFailure = (error) => ({
  type: 'TASK_SUBMIT_POST_FAILURE',
  error,
});

export const controversyTaskGetRequest = () => ({
  type: 'CONTROVERSY_TASK_GET_REQUEST',
});

export const controversyTaskGetSuccess = (task) => ({
  type: 'CONTROVERSY_TASK_GET_SUCCESS',
  task,
});

export const controversyTaskGetFailure = (error) => ({
  type: 'CONTROVERSY_TASK_GET_FAILURE',
  error,
});
