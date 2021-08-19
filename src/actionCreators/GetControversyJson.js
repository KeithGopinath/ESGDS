export const getControversyJsonSuccess = (controversyJson) => ({
  type: 'GET_CONTROVERSY_JSON_SUCCESS',
  controversyJson,
});

export const getControversyJsonFailure = (error) => ({
  type: 'GET_CONTROVERSY_JSON_FAILURE',
  error,
});
