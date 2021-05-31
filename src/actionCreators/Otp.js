export const getOtp = (otpDetails) => ({
  type: 'OTP_REQUEST',
  otpDetails,
});

export function getOtpSuccess(otp) {
  return {
    type: 'OTP_SUCCESS',
    otp,
  };
}

export function getOtpFailure(error) {
  return {
    type: 'OTP_FAILURE',
    error,
  };
}
