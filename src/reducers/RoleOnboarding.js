const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ROLE_ONBOARDING_REQUEST':
      return {
        ...state,
        isLoading: true,
        RoleOnboard: false,
        error: false,
      };
    case 'ROLE_ONBOARDING_SUCCESS':
      return {
        ...state,
        isLoading: true,
        roleOnboarding: action.roleOnboarding,
      };
    case 'ROLE_ONBOARDING_FAILURE':
      return {
        ...state,
        isLoading: true,
        error: action.error,
      };
    default:
      return state;
  }
};
