/*eslint-disable*/
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import jwt_decode from "jwt-decode";
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
  const [showOtp, setShowOtp] = useState(false);
  const [loginRole, setLoginRole] = useState(false);

  const dispatch = useDispatch();
  const login = useSelector((state) => state.loginState.login);
  const invalidLogin = useSelector((state) => state.loginState.error);
  const token = login && `${login.token}`;
  console.log('INvalid Login : ',invalidLogin);

  useEffect(() => {
    const decoded = token && jwt_decode(token);
    if (decoded && decoded.role === 'SuperAdmin' && loginRole) {
      setShowOtp(true);
      setLoginRole(false);
    } else if (decoded && decoded.role && loginRole) {
      setLoginRole(false);
      history.push("/dashboard");
    } else if (invalidLogin) {
      setValidate('border-danger');
       setAlert('Please enter the valid credentials');
    }
  });

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
    if (!email && !password && valid === false) {
      setValidate('border-danger');
      setAlert('Please enter the valid credentials');
    } else if (valid === false || invalidLogin) {
      setValidate('border-danger');
      setAlert('Please enter the vaild email');
    } else if (!password || invalidLogin) {
      setValidate('border-danger');
      setAlert('Please enter the vaild password');
    } else {
      setAlert('');
      setLoginRole(true);
      const loginDetails = {
        email,
        password
      }
      dispatch(
        {
          type: 'LOGIN_REQUEST',
          loginDetails
        });
    }

  };

  // Otp screen
  const handleClose = () => setShowOtp(false);

  const onSubmitOtp = () => {
    history.push("/dashboard");
  }

  const resendOtp = () => {
    window.alert("OTP resend to your mail ID");
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
                className={(email === '' || validateEmail(email) === false || invalidLogin ) && validate}
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
                className={password === '' || invalidLogin && validate}
                type="password"
                name="password"
                id="password"
                value={password}
                placeholder="password"
                onChange={onPasswordChange}
              />
              <div className="text-right">
                <a href="/forgetpassword" className="forget-password">Forget password</a>
              </div>
            </Form.Group>
            <span className="w-100 text-center text-danger"><p>{alert}</p></span>
            <Button className="w-100 login-button" type="submit" onClick={onLogin}>Login</Button>
          </Card>
          <OtpScreen
            show={showOtp}
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