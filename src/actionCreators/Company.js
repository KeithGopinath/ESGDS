import * as ESGDS from './../actionTypes/Company';

export function getCompanyRequest(companyDetails) {
  return {
    type: ESGDS.COMPANY_REQUEST,
    companyDetails,
  };
}

export function getCompanySuccess(client) {
  return {
    type: ESGDS.COMPANY_SUCCESS,
    client,
  };
}

export function getCompanyFailure(error) {
  return {
    type: ESGDS.COMPANY_FAILURE,
    error,
  };
}
