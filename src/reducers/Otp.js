import * as ESGDS from './../actionTypes/Otp';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case ESGDS.OTP_REQUEST:
      return {
        ...state,
        isLoading: true,
        otp: false,
        error: false,
      };
    case ESGDS.OTP_SUCCESS:
      return {
        ...state,
        isLoading: true,
        otp: action.otp,
      };
    case ESGDS.OTP_FAILURE:
      return {
        ...state,
        isLoading: true,
        error: action.error,
      };
    default:
      return state;
  }
};
