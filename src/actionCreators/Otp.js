export const getOtp = (otpDetails) => ({
  type: 'OTP_REQUEST',
  otpDetails,
});

export const getOtpSuccess = (otp) => ({
  type: 'OTP_SUCCESS',
  otp,
});

export const getOtpFailure = (error) => ({
  type: 'OTP_FAILURE',
  error,
});
