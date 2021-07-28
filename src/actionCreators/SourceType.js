export const sourceTypeGetRequest = () => ({
  type: 'SOURCE_TYPE_GET_REQUEST',
});

export const sourceTypeGetSuccess = (sourceTypeGetDetails) => ({
  type: 'SOURCE_TYPE_GET_SUCCESS',
  sourceTypeGetDetails,
});

export const sourceTypeGetFailure = (error) => ({
  type: 'SOURCE_TYPE_GET_FAILURE',
  error,
});

export const sourceTypePostRequest = () => ({
  type: 'SOURCE_TYPE_POST_REQUEST',
});

export const sourceTypePostSuccess = (sourceTypePostDetails) => ({
  type: 'SOURCE_TYPE_POST_SUCCESS',
  sourceTypePostDetails,
});

export const sourceTypePostFailure = (error) => ({
  type: 'SOURCE_TYPE_POST_FAILURE',
  error,
});
