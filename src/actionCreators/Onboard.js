export function getOnboard(onboardDetails) {
  return {
    type: 'ONBOARD_REQUEST',
    onboardDetails,
  };
}

export const getOnboardSuccess = (onboard) => ({
  type: 'ONBOARD_SUCCESS',
  onboard,
});

export const getOnboardFailure = (error) => ({
  type: 'ONBOARD_FAILURE',
  error,
});
