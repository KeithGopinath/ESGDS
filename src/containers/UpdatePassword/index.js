/* eslint-disable*/
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Button, Card, Form, Col, Jumbotron, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import Logo from '../../../assets/images/logo.png';
import PageLoader from '../../components/PageLoader';
import { history } from '../../routes';

const UpdatePassword = () => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [alertMsg, setAlertMsg] = useState('');
  const [validate, setValidate] = useState('');
  const [validPassword, setValidPassword] = useState(true);

  const validPasswordUpdate = useSelector((state) => state.updatePassword.updatePassword);
  const InvalidPasswordUpdate = useSelector((state) => state.updatePassword.error);
  const passwordUpdateLoading = useSelector((state) => state.updatePassword.isLoading);

  useEffect(() => {
    if (validPasswordUpdate) {
      setAlertMsg(validPasswordUpdate.message);
      setPassword('');
      setConfirmPassword('');
      setTimeout(() => {
        history.push('/');
      }, 2000);
    } else if (InvalidPasswordUpdate) {
      setAlertMsg(InvalidPasswordUpdate.message);
      setValidate('border-danger');
    }
  }, [validPasswordUpdate, InvalidPasswordUpdate]);

  const dispatch = useDispatch();
  const url = new URL(window.location.href)

  const onPasswordChange = (e) => {
    if (e.target.value.match('^[a-zA-Z0-9_@./!$#&+-]*$')) {
      setPassword(e.target.value);
      setValidPassword(true);
    }
  };

  const onConfirmPasswordChange = (e) => {
    if (e.target.value.match('^[a-zA-Z0-9_@./!$#&+-]*$')) {
      setConfirmPassword(e.target.value);
      setValidPassword(true);
    }
  };

  const tooltip = (props) => (
    <Tooltip className="password-update-tooltip" {...props}>
      <strong>Password must:</strong>
      <li>Should minium of eight (8) characters</li>
      <li>Should contain at least one (1) uppercase letter (A-Z), lowercase letter (a-z), number & special characters (!@#$%^&*_)</li>
    </Tooltip>
  );

  const onPasswordSubmit = () => {
    const re = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_])[a-zA-Z0-9!@#$%^&*_]{8,}$/;
    if (!password) {
      setAlertMsg('Please fill the required fields');
      setValidate('border-danger');
      setValidPassword(false);
    } else if (re.test(password)) {
      if (password === confirmPassword) {
        const pathArray = url.pathname.split('/');
        const token = pathArray[2];
        const payload = { password: password }
        dispatch({ type: 'UPDATE_PASSWORD_REQUEST', payload, token });
        setValidPassword(true);
        setValidate('');
        setAlertMsg('')
      } else {
        setAlertMsg("Password and confirm password does not match")
        setValidate('border-danger');
        setValidPassword(false);
      }
    } else {
      setAlertMsg('Password should match tooltip criteria');
      setValidate('border-danger');
      setValidPassword(false);
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
                  <Form.Label>Password <sup className="text-danger">* </sup>
                <span>
                  <OverlayTrigger placement="auto-end" overlay={tooltip} className="password-update-tooltip">
                    <FontAwesomeIcon className="info-icon" icon={faInfoCircle} />
                  </OverlayTrigger>
                </span>
              </Form.Label>
                    <Form.Control
                      className={!validPassword && validate}
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
                      className={!validPassword && validate}
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
