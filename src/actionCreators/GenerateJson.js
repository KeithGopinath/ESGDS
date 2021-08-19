export const generateJsonSuccess = (generateJson) => ({
  type: 'GENERATE_JSON_SUCCESS',
  generateJson,
});

export const generateJsonFailure = (error) => ({
  type: 'GENERATE_JSON_FAILURE',
  error,
});
