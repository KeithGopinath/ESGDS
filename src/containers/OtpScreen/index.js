/* eslint-disable*/
import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import OtpInput from 'react-otp-input';

const OtpScreen = ({ show, handleClose, onSubmitOtp, resendOtp }) => {
  const [Otp, setOtp] = useState('');

  const handleChange = (value) => {
    setOtp(value);
  }

  return (
    <Modal
      className="text-center otp-modal"
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      animation={false}
      centered
    >
      <Modal.Header className="otp-close" closeButton />
      <Modal.Body className="justify-content-center">
        <h4 className="enter-otp-text">Please Enter OTP</h4>
        <p>We have sent you one time password to your mail & registered mobile number</p>
        <OtpInput
          value={Otp}
          onChange={handleChange}
          numInputs={4}
          className="otp-input"
          inputStyle="otp-input-style"
          containerStyle="otp-input-container"
          focusStyle="otp-focus"
          shouldAutoFocus
        />
        <h6 className="mt-3 mb-3 text-secondary">Didn't receive the OTP?
          <span className="text-primary btn otp-resend" onClick={resendOtp}>RESEND</span>
        </h6>
        <Button className="mb-4" variant="primary" onClick={onSubmitOtp}>Verify</Button>
      </Modal.Body>
    </Modal>
  );
};

export default OtpScreen;
