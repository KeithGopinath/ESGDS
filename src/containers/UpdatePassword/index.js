/* eslint-disable*/
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Button, Card, Form, Col, Jumbotron } from 'react-bootstrap';
import Logo from '../../../assets/images/logo.png';
import PageLoader from '../../components/PageLoader';

const UpdatePassword = () => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [alertMsg, setAlertMsg] = useState('');
  const [validate, setValidate] = useState('');

  const validPasswordUpdate = useSelector((state) => state.updatePassword.updatePassword);
  const InvalidPasswordUpdate = useSelector((state) => state.updatePassword.error);
  const passwordUpdateLoading = useSelector((state) => state.updatePassword.isLoading);

  useEffect(() => {
    if (validPasswordUpdate) {
      setAlertMsg(validPasswordUpdate.message);
    } else if (InvalidPasswordUpdate) {
      setAlertMsg(InvalidPasswordUpdate.message);
      setValidate('border-danger');
    }
  }, [validPasswordUpdate, InvalidPasswordUpdate]);

  const dispatch = useDispatch();
  const url = new URL(window.location.href)

  const onPasswordChange = (e) => {
    if (e.target.value.match('^[a-zA-Z0-9_@./!$#&+-]*$')) {
      setPassword(e.target.value)
    }
  };

  const onConfirmPasswordChange = (e) => {
    if (e.target.value.match('^[a-zA-Z0-9_@./!$#&+-]*$')) {
      setConfirmPassword(e.target.value)
    }
  };

  const onPasswordSubmit = () => {
    if (!password || !confirmPassword) {
      setAlertMsg('Please fill the required fields');
      setValidate('border-danger');
    } else if (password !== confirmPassword) {
      setAlertMsg("Password and confirm password does not match")
      setValidate('border-danger');
    }
    else {
      const pathArray = url.pathname.split('/');
      const token = pathArray[2];
      const payload = { password: password }
      dispatch({ type: 'UPDATE_PASSWORD_REQUEST', payload, token });
      setValidate('');
      setAlertMsg('')
    }
  };

  // condition for Update password alert message class name
  const updatePasswordClass = validate || InvalidPasswordUpdate ? "danger" : "success";

  return (
    <Jumbotron className="update-password-jumbotron">
      <div className="card-container-update">
        <Row>
          <Col lg={12}>
            <Card className="card-styles shadow reset-password-card">
              <div className="update-password-logo">
                <img src={Logo} alt="logo" height="70vh" width="180vh" />
              </div>
              <Card.Title className="reset-title">Update Password</Card.Title>
              {passwordUpdateLoading ? <PageLoader /> :
                <React.Fragment>
                  <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      className={!password && validate}
                      type="password"
                      name="password"
                      value={password}
                      placeholder="passsword"
                      onChange={onPasswordChange}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Confirm password</Form.Label>
                    <Form.Control
                      className={!confirmPassword && validate}
                      type="password"
                      name="confirmpassword"
                      value={confirmPassword}
                      placeholder="confirm password"
                      onChange={onConfirmPasswordChange}
                    />
                  </Form.Group>
                  <span className={`w-100 text-center text-${updatePasswordClass}`}><p>{alertMsg}</p></span>
                  <Button className="w-100 login-button" type="submit" onClick={onPasswordSubmit}>Update password</Button><br></br>
                </React.Fragment>}
            </Card>
          </Col>
        </Row>
      </div>
    </Jumbotron>
  );
};

export default UpdatePassword;
