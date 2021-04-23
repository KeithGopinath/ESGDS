/*eslint-disable*/
import React, { useState } from 'react';
import { Col, Row, Button, Card, Form } from 'react-bootstrap';
import Banner from '../../../assets/images/login_image.png';
import Logo from '../../../assets/images/logo.png';
import { history } from '../../routes';
import OtpScreen from '../OtpScreen';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState('');
  const [validate, setValidate] = useState('');
  const [show, setShow] = useState(false);

  // Condition for Email Validation
  const validateEmail = (emailmsg) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(emailmsg);
  };

  const onEmailChange = (e) => {
    if (e.target.value.match('^[a-zA-Z0-9_@./#&+-]*$')) {
      setEmail(e.target.value);
    }
  };

  const onPasswordChange = (e) => {
    if (e.target.value.match('^[a-zA-Z0-9_@./#&+-]*$')) {
      setPassword(e.target.value)
    }
  };

  const onLogin = () => {
    const valid = validateEmail(email);
    console.log(valid,email, 'valid');
    if (!email && !password && valid === false) {
      setValidate('border-danger');
      setAlert('Please enter the valid credentials');
    } else if (valid === false) {
      setValidate('border-danger');
      setAlert('Please enter the vaild email');
    } else if (!password) {
      setValidate('border-danger');
      setAlert('Please enter the vaild password');
    } else {
      setShow(true);
    }
  };

  // Otp screen
  const handleClose = () => setShow(false);

  const onSubmitOtp = () => {
    history.push("/dashboard");
  }

  const resendOtp = () => {
    window.alert("OTP resent to your mail ID");
  }

  return (
    <Row className="login-container overflow-hidden">
      <Col className="banner banner-container" lg={8} sm={6} md={6}>
        <img className="banner-image jumbotran h-100" src={Banner} alt="banner" />
      </Col>
      <Col className="card-container" lg={4} sm={6} md={6}>
        <img src={Logo} alt="logo" />
        <div className="form-details">
          <h4 className="login-text">Login</h4>
          <p className="text-secondary">Enter your email and password to login</p>
          <Card className="card-styles shadow">
            <Form.Group>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                className={(email === '' || validateEmail(email) === false) && validate}
                type="text"
                name="email"
                id="email"
                value={email}
                placeholder="name@example.com"
                onChange={onEmailChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                className={password === '' && validate}
                type="password"
                name="password"
                id="password"
                value={password}
                placeholder="password"
                onChange={onPasswordChange}
              />
              <div className="forget-password text-right">
                <a href="/">Forget password?</a>
              </div>
            </Form.Group>
            <span className="w-100 text-center text-danger"><p>{alert}</p></span>
            <Button className="w-100" type="submit" onClick={onLogin}>Login</Button>
          </Card>
          <OtpScreen
            show={show}
            handleClose={handleClose}
            onSubmitOtp={onSubmitOtp}
            resendOtp={resendOtp}
          />
        </div>
      </Col>
    </Row>
  );
};

export default Login;