import * as ESGDS from '../actionTypes/Onboard';

export function getOnboard(onboardDetails) {
  return {
    type: ESGDS.ONBOARD_REQUEST,
    onboardDetails,
  };
}

export function getOnboardSuccess(onboard) {
  return {
    type: ESGDS.ONBOARD_SUCCESS,
    onboard,
  };
}

export function getOnboardFailure(error) {
  return {
    type: ESGDS.ONBOARD_FAILURE,
    error,
  };
}
