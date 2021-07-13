/* eslint-disable*/
import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import OtpInput from 'react-otp-input';
import Overlay from '../../components/Overlay';

const OtpScreen = ({
  show, handleClose, onSubmitOtp, resendOtp, inputOtp, otpHandleChange, alert, email, seconds, start, resendOtpClass,
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
    </div>);
  const Resend = () => (
    <p className="text-secondary w-100 text-center">Didn't receive the OTP ?<span className="text-primary btn otp-resend" onClick={resendOtp}>{!start ? "Resend OTP" : `00:${seconds}`}</span></p>

  );

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
      footer={<Resend />}
    />
  );
};

export default OtpScreen;
