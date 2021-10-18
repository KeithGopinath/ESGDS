export const UserAssignCompaniesSuccess = (userCompanies) => ({
  type: 'USER_ASSIGN_COMPANIES_SUCCESS',
  userCompanies,
});

export const UserAssignCompaniesFailure = (error) => ({
  type: 'USER_ASSIGN_COMPANIES_FAILURE',
  error,
});
