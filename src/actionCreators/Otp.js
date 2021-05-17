import * as ESGDS from './../actionTypes/Otp';

export const getOtp = (otpDetails) => ({
  type: ESGDS.OTP_REQUEST,
  otpDetails,
});

export function getOtpSuccess(otp) {
  return {
    type: ESGDS.OTP_SUCCESS,
    otp,
  };
}

export function getOtpFailure(error) {
  return {
    type: ESGDS.OTP_FAILURE,
    error,
  };
}
