export const getRoleOnboarding = (roleOnboarding) => ({
  type: 'ROLE_ONBOARDING_REQUEST',
  roleOnboarding,
});

export const getRoleOnboardingSuccess = (onboard) => ({
  type: 'ROLE_ONBOARDING_SUCCESS',
  onboard,
});

export const getRoleOnboardingFailure = (error) => ({
  type: 'ROLE_ONBOARDING_FAILURE',
  error,
});
