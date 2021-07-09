const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ROLE_ONBOARDING_REQUEST':
      return {
        ...state,
        isLoading: true,
        roleOnboarding: false,
        error: false,
      };
    case 'ROLE_ONBOARDING_SUCCESS':
      return {
        ...state,
        isLoading: false,
        roleOnboarding: action.onboard,
      };
    case 'ROLE_ONBOARDING_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
