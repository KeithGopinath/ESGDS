const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'FORGOT_PASSWORD_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: false,
        forgotPassword: false,
      };
    case 'FORGOT_PASSWORD_SUCCESS':
      return {
        ...state,
        isLoading: false,
        forgotPassword: action.forgotPassword,
      };
    case 'FORGOT_PASSWORD_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
