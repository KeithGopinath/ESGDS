const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'OTP_REQUEST':
      return {
        ...state,
        isLoading: true,
        otp: false,
        error: false,
      };
    case 'OTP_SUCCESS':
      return {
        ...state,
        isLoading: false,
        otp: action.otp,
      };
    case 'OTP_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
