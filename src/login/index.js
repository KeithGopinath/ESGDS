import React, { useState } from 'react';
import { Col, Row, Button, Card, Form } from 'react-bootstrap';
import Banner from '../../assets/images/login_image.png';
import Logo from '../../assets/images/logo.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState('');
  const [validate, setValidate] = useState('');

  const onEmailChage = (e) => {
    setEmail(e.target.value);
  };

  const onPasswordChage = (e) => {
    setPassword(e.target.value);
  };

  const onLogin = () => {
    if (email === '' && password === '') {
      setValidate('text-empty');
      setAlert('Please fill all the fields');
    } else if (email === '') {
      setValidate('text-empty');
      setAlert('Please fill all the fields');
    } else if (password === '') {
      setValidate('text-empty');
      setAlert('Please fill all the fields');
    } else {
      setValidate('');
      setAlert('');
    }
  };

  return (
    <Row className="login-container">
      <Col className="banner w-100" lg={8} sm={6} md={6}>
        <img className="banner-image jumbotran d-flex flex-column h-100" src={Banner} alt="banner" />
      </Col>
      <Col className="h-auto" lg={4} sm={6} md={6}>
        <img className="" src={Logo} alt="logo" />
        <div className="form-details">
          <h4 className="login-text">Login</h4>
          <p className="text-secondary">Enter your email and password to login</p>
          <Card className="card-styles shadow m-auto">
            <Form.Group>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                className={!email && validate}
                type="email"
                name="email"
                value={email}
                placeholder="name@example.com"
                onChange={onEmailChage}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                className={!password && validate}
                type="password"
                name="password"
                value={password}
                placeholder="password"
                onChange={onPasswordChage}
              />
              <div className="forget-password text-right">
                <a href="/">Forget password?</a>
              </div>
            </Form.Group>
            <span className="w-100 text-center text-danger"><p>{alert}</p></span>
            <Button className="w-100" type="submit" onClick={onLogin}>Login</Button>
          </Card>
        </div>
      </Col>
    </Row>
  );
};

export default Login;
