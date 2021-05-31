export const getCompanyListRequest = () => ({
  type: 'COMPANY_LIST_REQUEST',
});

export function getCompanyListSuccess(companylist) {
  return {
    type: 'COMPANY_LIST_SUCCESS',
    companylist,
  };
}

export function getCompanyListFailure(error) {
  return {
    type: 'COMPANY_LIST_FAILURE',
    error,
  };
}
