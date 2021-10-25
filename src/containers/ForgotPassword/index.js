/* eslint-disable*/
import React from 'react';
import { Form } from 'react-bootstrap';
import Overlay from '../../components/Overlay';

const ForgotPassword = ({
    show, handleClose, onSubmitForgotPassword, validate, forgotPasswordAlert, email, onEmailChange, forgotPasswordClass,forgotPasswordLoading
}) => {

    const passwordBody = () => (
        <div>
            <p className="forgot-password-message">Enter your email to receive instructions on how to reset your password.</p>
            <Form.Group>
                <Form.Control
                    className={validate}
                    type="text"
                    name="email"
                    id="email"
                    value={email}
                    placeholder="Email address"
                    onChange={onEmailChange}
                />
            </Form.Group>
        </div>
    )

    const Redirect = () => (
        <p className="text-secondary w-100 text-center">Or return to
            <span className="text-primary btn forgot-password-resend" onClick={handleClose}>Log In</span>
        </p>);

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
            title="Reset Password"
            body={passwordBody()}
            alert={forgotPasswordAlert}
            primary="Reset Password"
            onSubmitPrimary={onSubmitForgotPassword}
            footer={<Redirect />}
            alertClass={forgotPasswordClass}
            isLoading={forgotPasswordLoading}
        />
    );
};

export default ForgotPassword;
