/*eslint-disable*/
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row, Button, Card, Form } from 'react-bootstrap';
import { message } from 'antd';
import Banner from '../../../assets/images/login_image.png';
import Logo from '../../../assets/images/logo.png';
import { history } from '../../routes';
import OtpScreen from '../OtpScreen';
import ForgotPassword from '../ForgotPassword';
import PageLoader from '../../components/PageLoader';

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
  const [start, setStart] = useState(false);
  const [seconds, setSeconds] = useState(30);
  const [captchaToken, setCaptchaToken] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  // login
  const login = useSelector((state) => state.login.login);
  const invalidLogin = useSelector((state) => state.login.error);
  const loginLoading = useSelector((state) => state.login.isLoading);

  // otpScreen
  const validOtp = useSelector((state) => state.otp.otp);
  const invalidOtp = useSelector((state) => state.otp.error);
  const otpLoading = useSelector((state) => state.otp.isLoading);

  // forgot password screen
  const validPasswordChange = useSelector((state) => state.forgotPassword.forgotPassword);
  const InvalidPasswordChange = useSelector((state) => state.forgotPassword.error);
  const forgotPasswordLoading = useSelector((state) => state.forgotPassword.isLoading);

  // checking user role
  const role = login && login.user && login.user.roleDetails.primaryRole.label;

  useEffect(() => {
    // for users who have a primary role
    if (loginRole && role) {
      setLoginRole(false);
      if (role == 'Company Representative' || role == 'Client Representative') {
        history.push("/user-profile");
      } else if (role == 'QA' || role == 'Analyst' || role == 'GroupAdmin') {
        history.push("/dashboard");
      }
    }
    // for users who do not have primary role
    else if (loginRole && login.user) {
      history.push("/dashboard");
      setLoginRole(false);
    }
    // for Admin and SuperAdmin
    else if (loginRole && login) {
      setShowOtp(true);
      setLoginRole(false);
      setLoading(false)
    }
  }, [login]);

  useEffect(() => {
    if (loginRole && login && role) {
      message.success(login.message)
    } else if (loginRole && invalidLogin) {
      message.error(invalidLogin.message)
      setLoading(false)
    }
  }, [login, invalidLogin]);

  useEffect(() => {
    if (validOtp && otpLogin) {
      setOtpLogin(false);
      history.push("/dashboard");
      message.success(validOtp.message)
    } else if (invalidOtp) {
      setOtpAlert(invalidOtp.message);
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

  // resend timer
  // useEffect(() => {
  //   if (start) {
  //     if (seconds > 0) {
  //       setTimeout(() => setSeconds(seconds - 1), 1000);
  //     } else {
  //       setStart(false);
  //       setOtpAlert('');
  //     }
  //   }
  // });

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
    if (e.target.value.match('^[a-zA-Z0-9_$!@./#&+-]*$')) {
      setPassword(e.target.value)
    }
  };

  const onLogin = () => {
    const valid = validateEmail(email);
    if (!email && !password && valid === false) {
      setValidate('border-danger');
      message.error('Please enter the valid credentials')
    } else if (valid === false) {
      setValidate('border-danger');
      message.error('Please enter the vaild email')
    } else if (!password) {
      setValidate('border-danger');
      message.error('Please enter the vaild password')
    } else {
      setLoading(true)
      // grecaptcha.ready(() => {
      //   grecaptcha.execute('6LdSd94cAAAAAGqQ_h1zL1dLqM0fhX-qlUi1tP3c', { action: 'login' }).then((token) => {
      //     submitToken(token)
      //     // grecaptcha.reset();
      //   })
      // })

      // const submitToken = token => {
        setLoginAlert('');
        setLoginRole(true);
        setStart(true);
        // setSeconds(30);
        const login = { email, password }
        let objJsonStr = JSON.stringify(login);
        let user = Buffer.from(objJsonStr).toString("base64");
        const loginDetails = {
          login: user,
          // token
        }
        dispatch({ type: 'LOGIN_REQUEST', loginDetails });
      // }
    }
  };

  // Otp screen
  const handleClose = () => {
    setShowOtp(false);
    // setSeconds(0);
    setOtpAlert('');
    setOtp('');
    sessionStorage.clear();
  };

  const onSubmitOtp = () => {
    if (!otp) {
      setOtpAlert('Please enter valid otp');
    } else {
      setOtpAlert('');
      setOtpLogin(true);

      const login = { email, otp }
      let objJsonStr = JSON.stringify(login);
      let user = Buffer.from(objJsonStr).toString("base64");

      const otpDetails = {
        login: user,
        token: captchaToken
      }
      dispatch({ type: 'OTP_REQUEST', otpDetails });
    }
  }

  // resend otp 
  const resendOtp = () => {
    // setSeconds(30);
    setStart(true);
    const login = { email, password }
    let objJsonStr = JSON.stringify(login);
    let user = Buffer.from(objJsonStr).toString("base64");
    const loginDetails = {
      login: user
    }
    dispatch({ type: 'LOGIN_REQUEST', loginDetails });
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
    } else {
      const payload = {
        email: forgotemail,
        link: "http://localhost:3000/password-resets",
      }
      dispatch({ type: 'FORGOT_PASSWORD_REQUEST', payload });
      setforgotPasswordvalidate('');
      setforgotPasswordAlert('');
    }
  }

  // condition for Forgot password alert message class name
  const forgotPasswordClass = forgotPasswordvalidate ? 'danger' : validPasswordChange ? 'success' : 'danger';

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
            {loading || loginLoading ? <PageLoader load="login-loader" /> : <Button className="w-100 login-button" type="submit" onClick={onLogin}>Login</Button>}
          </Card>
          <OtpScreen
            show={showOtp}
            start={start}
            handleClose={handleClose}
            onSubmitOtp={onSubmitOtp}
            resendOtp={resendOtp}
            inputOtp={otp}
            otpHandleChange={otpHandleChange}
            validateOtp={validate}
            alert={otpAlert}
            email={email}
            // seconds={seconds}
            otpLoading={otpLoading}
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
            forgotPasswordLoading={forgotPasswordLoading}
          />
        </div>
      </Col>
    </Row>
  );
};

export default Login;