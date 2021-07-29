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

// CONTRO GET
export const controversyDpCodeDataGetRequest = () => ({
  type: 'CONTROVERSY_DPCODEDATA_GET_REQUEST',
});

export const controversyDpCodeDataGetSuccess = (controversyDpCodeData) => ({
  type: 'CONTROVERSY_DPCODEDATA_GET_SUCCESS',
  controversyDpCodeData,
});

export const controversyDpCodeDataGetFailure = (error) => ({
  type: 'CONTROVERSY_DPCODEDATA_GET_FAILURE',
  error,
});

// CONTRO POST
export const controversyDpCodeDataPostRequest = () => ({
  type: 'CONTROVERSY_DPCODEDATA_POST_REQUEST',
});

export const controversyDpCodeDataPostSuccess = (controversyDpCodeData) => ({
  type: 'CONTROVERSY_DPCODEDATA_POST_SUCCESS',
  controversyDpCodeData,
});

export const controversyDpCodeDataPostFailure = (error) => ({
  type: 'CONTROVERSY_DPCODEDATA_POST_FAILURE',
  error,
});

// CONTRO UPDATE
export const controversyDpCodeDataUpdateRequest = () => ({
  type: 'CONTROVERSY_DPCODEDATA_UPDATE_REQUEST',
});

export const controversyDpCodeDataUpdateSuccess = (controversyDpCodeData) => ({
  type: 'CONTROVERSY_DPCODEDATA_UPDATE_SUCCESS',
  controversyDpCodeData,
});

export const controversyDpCodeDataUpdateFailure = (error) => ({
  type: 'CONTROVERSY_DPCODEDATA_UPDATE_FAILURE',
  error,
});
