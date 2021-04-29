/* eslint-disable*/
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import OtpInput from 'react-otp-input';

const OtpScreen = ({ show, handleClose, onSubmitOtp, resendOtp, inputOpt, otpHandleChange, alert }) => {
  return (
    <Modal
      className="text-center otp-modal"
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      animation={true}
      centered
    >
      <Modal.Header className="otp-close" closeButton />
      <Modal.Body className="justify-content-center">
        <h4 className="enter-otp-text">Please Enter OTP</h4>
        <p>We have sent you one time password to your mail</p>
        <OtpInput
          value={inputOpt}
          onChange={otpHandleChange}
          numInputs={4}
          className="otp-input"
          inputStyle="otp-input-style"
          containerStyle="otp-input-container"
          shouldAutoFocus
          isInputNum
          focusStyle="otp-focus"
        />
        <h6 className="mt-3 mb-3 text-secondary">Didn't receive the OTP?
          <span className="text-primary btn otp-resend" onClick={resendOtp}>RESEND</span>
        </h6>
        <span className="w-100 text-center text-danger"><p>{alert}</p></span>
        <Button className="mb-4 login-button" variant="primary" onClick={onSubmitOtp}>Verify</Button>
      </Modal.Body>
    </Modal>
  );
};

export default OtpScreen;
