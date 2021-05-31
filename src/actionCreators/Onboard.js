export function getOnboard(onboardDetails) {
  return {
    type: 'ONBOARD_REQUEST',
    onboardDetails,
  };
}

export function getOnboardSuccess(onboard) {
  return {
    type: 'ONBOARD_SUCCESS',
    onboard,
  };
}

export function getOnboardFailure(error) {
  return {
    type: 'ONBOARD_FAILURE',
    error,
  };
}
