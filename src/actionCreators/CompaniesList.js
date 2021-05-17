import * as ESGDS from './../actionTypes/CompaniesList';

export const getCompanyListRequest = () => ({
  type: ESGDS.COMPANY_LIST_REQUEST,
});

export function getCompanyListSuccess(companylist) {
  return {
    type: ESGDS.COMPANY_LIST_SUCCESS,
    companylist,
  };
}

export function getCompanyListFailure(error) {
  return {
    type: ESGDS.COMPANY_LIST_FAILURE,
    error,
  };
}
