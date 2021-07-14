/* eslint-disable*/
import React from 'react';
import OtpInput from 'react-otp-input';
import Overlay from '../../components/Overlay';

const OtpScreen = ({
  show, handleClose, onSubmitOtp, resendOtp, inputOtp, otpHandleChange, alert, email, seconds, start,
}) => {
  const OtpBody = () => (
    <div><p>We've sent a one time password to the email <span>{email}</span></p>
      <OtpInput
        value={inputOtp}
        onChange={otpHandleChange}
        numInputs={4}
        className="otp-input"
        inputStyle="otp-input-style"
        containerStyle="otp-input-container"
        shouldAutoFocus
        isInputNum
        focusStyle="otp-focus"
      />
      {start ? <p className="otp-resend-text">Resend code in 00:{seconds.toString().length === 1 ? `0${seconds}` : seconds}</p> : seconds === 0 ? <span className="text-primary otp-resend" onClick={resendOtp}>Resend OTP</span> : ''}
    </div>);

  return (
    <Overlay
      className="text-center otp-modal"
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      animation
      centered
      size="md"
      title="Authentication Required"
      body={OtpBody()}
      alert={alert}
      alertClass={start ? 'success' : 'danger'}
      primary="Verify"
      onSubmitPrimary={onSubmitOtp}
    />
  );
};

export default OtpScreen;
