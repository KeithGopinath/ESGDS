import * as OTP from './../actionTypes/Otp';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case OTP.OTP_REQUEST:
      return {
        ...state,
        isLoading: true,
        otp: false,
        error: false,
      };
    case OTP.OTP_SUCCESS:
      return {
        ...state,
        isLoading: true,
        otp: action.otp,
      };
    case OTP.OTP_FAILURE:
      return {
        ...state,
        isLoading: true,
        error: action.error,
      };
    default:
      return state;
  }
};
