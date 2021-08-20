export const downloadJsonSuccess = (downloadJson) => ({
  type: 'DOWNLOAD_JSON_SUCCESS',
  downloadJson,
});

export const downloadJsonFailure = (error) => ({
  type: 'DOWNLOAD_JSON_FAILURE',
  error,
});
