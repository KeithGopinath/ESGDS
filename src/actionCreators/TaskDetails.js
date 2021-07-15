export const getTaskdetailsRequest = () => ({
  type: 'TASKDETAILS_REQUEST',
});

export const getTaskdetailsSuccess = (tasklist) => ({
  type: 'TASKDETAILS_SUCCESS',
  tasklist,
});

export const getTaskdetailsFailure = (error) => ({
  type: 'TASKDETAILS_FAILURE',
  error,
});
