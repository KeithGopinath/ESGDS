// Pending TaskList
export const getPendingTaskListSuccess = (pendingTasklist) => ({
  type: 'GET_PENDING_TASKLIST_SUCCESS',
  pendingTasklist,
});

export const getPendingTaskListFailure = (error) => ({
  type: 'GET_PENDING_TASKLIST_FAILURE',
  error,
});

// Completed TaskList
export const getCompletedTaskListSuccess = (completedTasklist) => ({
  type: 'GET_COMPLETED_TASKLIST_SUCCESS',
  completedTasklist,
});

export const getCompletedTaskListFailure = (error) => ({
  type: 'GET_COMPLETED_TASKLIST_FAILURE',
  error,
});

// Controversy TaskList
export const getControversyTaskListSuccess = (contorversyTasklist) => ({
  type: 'GET_CONTROVERSY_TASKLIST_SUCCESS',
  contorversyTasklist,
});

export const getControversyTaskListFailure = (error) => ({
  type: 'GET_CONTROVERSY_TASKLIST_FAILURE',
  error,
});
