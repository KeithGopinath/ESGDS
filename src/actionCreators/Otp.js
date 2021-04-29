import * as OTP from './../actionTypes/Otp';

export const getOtp = (otpDetails) => ({
  type: OTP.OTP_REQUEST,
  otpDetails,
});

export function getOtpSuccess(otp) {
  return {
    type: OTP.OTP_SUCCESS,
    otp,
  };
}

export function getOtpFailure(error) {
  return {
    type: OTP.OTP_FAILURE,
    error,
  };
}
