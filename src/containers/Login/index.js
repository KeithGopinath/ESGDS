/*eslint-disable*/
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import jwt_decode from "jwt-decode";
import { Col, Row, Button, Card, Form } from 'react-bootstrap';
import Banner from '../../../assets/images/login_image.png';
import Logo from '../../../assets/images/logo.png';
import { history } from '../../routes';
import OtpScreen from '../OtpScreen';
import ForgotPassword from '../ForgotPassword';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginAlert, setLoginAlert] = useState('');
  const [validate, setValidate] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [showForgotPassword, setshowForgotPassword] = useState(false);
  const [loginRole, setLoginRole] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpLogin, setOtpLogin] = useState(false);
  const [otpAlert, setOtpAlert] = useState('');
  const [forgotemail, setForgotemail] = useState('');
  const [forgotPasswordAlert, setforgotPasswordAlert] = useState('');
  const [forgotPasswordvalidate, setforgotPasswordvalidate] = useState('');

  const dispatch = useDispatch();
  // login
  const login = useSelector((state) => state.login.login);
  const invalidLogin = useSelector((state) => state.login.error);
  // const token = login && `${login.token}`;

  // Temp fix have to use in useEffect 
  const token = login && login.token;
  sessionStorage.access = token

  const decoded = token && jwt_decode(token);

  // otpScreen
  const validOtp = useSelector((state) => state.otp.otp);
  const invalidOtp = useSelector((state) => state.otp.error);
  // forgot password screen
  const validPasswordChange = useSelector((state) => state.forgotPassword.forgotPassword);
  const InvalidPasswordChange = useSelector((state) => state.forgotPassword.error);

  const role = login && login.user.role;
  
  useEffect(() => {
    if (loginRole && role) {
      setLoginRole(false);
      if (role !== 'admin') {
        history.push("/dashboard");
        // sessionStorage.role = decoded && decoded.role
      } else {
        setShowOtp(true);
      }
    } else if (invalidLogin) {
      setValidate('border-danger');
      setLoginAlert('Please enter the valid credentials');
    }
  });

  useEffect(() => {
    if (validOtp && otpLogin) {
      setOtpLogin(false);
      history.push("/dashboard");
      sessionStorage.role = decoded && decoded.role
    } else if (invalidOtp) {
      setOtpAlert('Please enter valid OTP');
    }
  }, [invalidOtp, validOtp]);

  useEffect(() => {
    if (validPasswordChange) {
      setforgotPasswordAlert(validPasswordChange.message);
    } else if (InvalidPasswordChange) {
      setforgotPasswordAlert(InvalidPasswordChange.message);
      setforgotPasswordvalidate('border-danger');
    }
  }, [validPasswordChange, InvalidPasswordChange]);

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
      setLoginAlert('Please enter the valid credentials');
    } else if (valid === false) {
      setValidate('border-danger');
      setLoginAlert('Please enter the vaild email');
    } else if (!password) {
      setValidate('border-danger');
      setLoginAlert('Please enter the vaild password');
    } else {
      setLoginAlert('');
      setLoginRole(true);

      // To send the login details in base 64 format through header 
      const login = { email, password }
      const user = btoa(`${login.email}:${login.password}`)
      sessionStorage.auth = user

      const loginDetails = {
        access_token: "lO2xCXWdiE6hbOU600RY8ffonQnQpXAq",
      }

      dispatch({ type: 'LOGIN_REQUEST', loginDetails });
    }
  };

  // Otp screen
  const handleClose = () => {
    setShowOtp(false);
    setOtpAlert('');
    setOtp('');
  };

  const onSubmitOtp = () => {
    if (!otp) {
      setOtpAlert('Please enter valid otp');
    } else {
      setOtpAlert('');
      setOtpLogin(true);
      const otpDetails = {
        email,
        otp
      }
      dispatch({ type: 'OTP_REQUEST', otpDetails });
    }
  }

  const resendOtp = () => {
    window.alert("OTP resend to your mail ID");
  }

  const otpHandleChange = (value) => {
    setOtp(value);
  }

  // Forgot password screen
  const forgotPassword = () => {
    setshowForgotPassword(true);
  }

  const forgotPasswordClose = () => {
    setshowForgotPassword(false);
    setforgotPasswordvalidate('');
    setforgotPasswordAlert('');
    setForgotemail('');
  }

  const onForgotEmailChange = (e) => {
    if (e.target.value.match('^[a-zA-Z0-9_@./#&+-]*$')) {
      setForgotemail(e.target.value);
    }
  };

  const onSubmitForgotPassword = () => {
    const valid = validateEmail(forgotemail);
    if (!forgotemail || valid == false) {
      setforgotPasswordAlert('Please enter the valid credential')
      setforgotPasswordvalidate('border-danger')
    }
    else {
      const payload = {
        email: forgotemail,
        access_token: "lO2xCXWdiE6hbOU600RY8ffonQnQpXAq",
        link: "http://localhost:3000/password-resets",
      }
      dispatch(
        {
          type: 'FORGOT_PASSWORD_REQUEST',
          payload
        });
      setforgotPasswordvalidate('');
      setforgotPasswordAlert('')
    }
  }

  // condition for Forgot password alert message class name
  const forgotPasswordClass = forgotPasswordvalidate || InvalidPasswordChange ? "danger" : "success";

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
                className={(email === '' || validateEmail(email) === false || invalidLogin) && validate}
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
                className={(password === '' || invalidLogin) && validate}
                type="password"
                name="password"
                id="password"
                value={password}
                placeholder="password"
                onChange={onPasswordChange}
              />
              <div className="text-right">
                <span className="forgot-password" onClick={forgotPassword} >Forgot password</span>
              </div>
            </Form.Group>
            <span className="w-100 text-center text-danger"><p>{loginAlert}</p></span>
            <Button className="w-100 login-button" type="submit" onClick={onLogin}>Login</Button>
          </Card>
          <OtpScreen
            show={showOtp}
            handleClose={handleClose}
            onSubmitOtp={onSubmitOtp}
            resendOtp={resendOtp}
            inputOtp={otp}
            otpHandleChange={otpHandleChange}
            validateOtp={validate}
            alert={otpAlert}
            email={email}
          />
          <ForgotPassword
            show={showForgotPassword}
            handleClose={forgotPasswordClose}
            onSubmitForgotPassword={onSubmitForgotPassword}
            validate={forgotPasswordvalidate}
            forgotPasswordAlert={forgotPasswordAlert}
            email={forgotemail}
            onEmailChange={onForgotEmailChange}
            forgotPasswordClass={forgotPasswordClass}
          />
        </div>
      </Col>
    </Row>
  );
};

export default Login;