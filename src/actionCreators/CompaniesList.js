export const getCompanyListRequest = () => ({
  type: 'COMPANY_LIST_REQUEST',
});

export const getCompanyListSuccess = (companylist) => ({
  type: 'COMPANY_LIST_SUCCESS',
  companylist,
});

export const getCompanyListFailure = (error) => ({
  type: 'COMPANY_LIST_FAILURE',
  error,
});
