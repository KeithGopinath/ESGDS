export const dpCodeDataGetRequest = () => ({
  type: 'DPCODEDATA_GET_REQUEST',
});

export const dpCodeDataGetSuccess = (dpCodeData) => ({
  type: 'DPCODEDATA_GET_SUCCESS',
  dpCodeData,
});

export const dpCodeDataGetFailure = (error) => ({
  type: 'DPCODEDATA_GET_FAILURE',
  error,
});
