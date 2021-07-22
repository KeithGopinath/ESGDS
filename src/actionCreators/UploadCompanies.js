export const uploadCompaniesSuccess = (uploadCompanies) => ({
  type: 'UPLOAD_COMPANIES_SUCCESS',
  uploadCompanies,
});

export const uploadCompaniesFailure = (error) => ({
  type: 'UPLOAD_COMPANIES_FAILURE',
  error,
});
