export const getDataJsonSuccess = (dataJson) => ({
  type: 'GET_DATA_JSON_SUCCESS',
  dataJson,
});

export const getDataJsonFailure = (error) => ({
  type: 'GET_DATA_JSON_FAILURE',
  error,
});
