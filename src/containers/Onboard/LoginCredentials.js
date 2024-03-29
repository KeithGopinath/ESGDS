/*eslint-disable*/
import React, { useState } from 'react';
import { Card, Form, Row, Col, Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { message } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const LoginCredentials = ({ onPassword, previousStep, nextStep, onSubmit, setActiveStep, activeStep }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loginCredentialsAlert, setLoginCredentialsAlert] = useState('');
  const [validPassword, setValidPassword] = useState(true);

  const handlePassword = (e) => {
    if (e.target.value.match('^[a-zA-Z0-9!@#$%^&*_]*$')) {
      setPassword(e.target.value);
      onPassword(e.target.value);
      setValidPassword(true);
    }
  };

  const handleConfirmPassword = (e) => {
    if (e.target.value.match('^[a-zA-Z0-9!@#$%^&*_]*$')) {
      setConfirmPassword(e.target.value);
      setValidPassword(true);
    }
  };

  const passwordValidation = () => {
    const re = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_])[a-zA-Z0-9!@#$%^&*_]{8,}$/;
    if (!password) {
      message.error('Please enter your password');
      setValidPassword(false);
    } else if (re.test(password)) {
      if (password === confirmPassword) {
        setValidPassword(true);
        setLoginCredentialsAlert('');
        onSubmit();
        nextStep();
        setActiveStep(activeStep + 1);
      } else {
        message.error('Should match confirm password');
        setValidPassword(false);
      }
    } else {
      message.error('Password should match below criteria');
      setValidPassword(false);
    }
  };

  const goToProofUpload = () => {
    previousStep();
    setActiveStep(activeStep - 1);
  };

  const renderTooltip = (props) => (
    <Tooltip className="password-tooltip" {...props}>
      <strong>Password must:</strong>
      <li>Should minium of eight (8) characters</li>
      <li>Should contain at least one (1) uppercase letter (A-Z), lowercase letter (a-z), number & special characters (!@#$%^&*_)</li>
    </Tooltip>
  );

  return (
    <Row className="logincred-content mr-0">
      <Card className="logincred-details shadow mb-5">
        <h4 className="logincred-text">Login Credentials</h4>
        <Row className="d-flex justify-content-around">
          <Col lg={5} md={6} sm={6}>
            <Form.Group>
              <Form.Label>Create password <sup className="text-danger">* </sup>
                <span>
                  <OverlayTrigger placement="auto-end" overlay={renderTooltip} className="password-tooltip">
                    <FontAwesomeIcon className="info-icon" icon={faInfoCircle} />
                  </OverlayTrigger>
                </span>
              </Form.Label>
              <Form.Control
                className={!validPassword && 'border-danger'}
                type="password"
                name="createPassword"
                id="createPassword"
                value={password}
                placeholder="Enter your password"
                onChange={handlePassword}
              />
            </Form.Group>
          </Col>
          <Col lg={5} md={6} sm={6}>
            <Form.Group>
              <Form.Label>Confirm password <sup className="text-danger">*</sup></Form.Label>
              <Form.Control
                className={!validPassword && 'border-danger'}
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={confirmPassword}
                placeholder="Confirm your password"
                onChange={handleConfirmPassword}
              />
            </Form.Group>
          </Col>
        </Row>
        <span className="ml-3 mt-5"> <sup className="text-danger">*</sup> Required fields</span>
        <p className="ml-3 mr-3 mt-2"> <sup className="text-danger">*</sup> Use 8 or more characters at least one Uppercase, Lowercase letter, Number & special character</p>
        <div className="d-flex flex-row justify-content-end mt-1">
          <span><Button className="back mr-1" onClick={goToProofUpload}>Back</Button></span>
          <span><Button className="save-continue" onClick={passwordValidation}>Submit</Button></span>
        </div>
      </Card>
    </Row>
  );
};

export default LoginCredentials;
