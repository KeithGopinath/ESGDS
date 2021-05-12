import * as COMPANY from './../actionTypes/Company';

export function getCompanyRequest(companyDetails) {
  return {
    type: COMPANY.COMPANY_REQUEST,
    companyDetails,
  };
}

export function getCompanySuccess(client) {
  return {
    type: COMPANY.COMPANY_SUCCESS,
    client,
  };
}

export function getCompanyFailure(error) {
  return {
    type: COMPANY.COMPANY_FAILURE,
    error,
  };
}
