import * as COMPANY from './../actionTypes/CompaniesList';

export const getCompanyRequest = () => ({
  type: COMPANY.COMPANY_REQUEST,
});

export function getCompanySuccess(companylist) {
  return {
    type: COMPANY.COMPANY_SUCCESS,
    companylist,
  };
}

export function getCompanyFailure(error) {
  return {
    type: COMPANY.COMPANY_FAILURE,
    error,
  };
}
