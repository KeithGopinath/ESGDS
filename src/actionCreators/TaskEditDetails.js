export const taskEditDetailsRequest = (payload) => ({
  type: 'TASKEDITDETAILS_REQUEST',
  payload,
});

export const taskEditDetailsSuccess = (taskedit) => ({
  type: 'TASKEDITDETAILS_SUCCESS',
  taskedit,
});

export const taskEditDetailsFailure = (error) => ({
  type: 'TASKEDITDETAILS_FAILURE',
  error,
});
