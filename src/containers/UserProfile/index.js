/* eslint-disable */
import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Form, Row, Col, Container, Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import Header from '../../components/Header';
import SideMenuBar from '../../components/SideMenuBar';
import Overlay from '../../components/Overlay';
import OtpInput from 'react-otp-input';
import { Image } from 'antd';
import { Input } from 'antd';
import Select from 'react-select';
import { EditFilled, InfoCircleOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const UserProfile = () => {
  const sideBarRef = useRef();
  const [flag, setFlag] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);
  const [updateFlag, setUpdateFlag] = useState();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [bankAccountNumber, setBankAccountNumber] = useState('');
  const [bankIFSCCode, setBankIFSCCode] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [password, setPassword] = useState('');
  const [inputOtp, setInputOtp] = useState('');
  const [chequeFile, setChequeFile] = useState();
  const [fileLabel, setFileLabel] = useState('');
  const [alertMsg, setAlertMsg] = useState('');
  const [errorAlert, setErrorAlert] = useState('');

  const dispatch = useDispatch();
  const login = useSelector((state) => state.login.login);
  const otpDetails = useSelector((state) => state.otp.otp);
  const userData = useSelector((state) => state.getUserById.userById);

  const sessionRole = (sessionStorage.role == 'Company Representative' || sessionStorage.role == 'Client Representative') ? sessionStorage.role : 'Employee';
  const role = otpDetails && otpDetails.user.userType || login && login.user && login.user.userType || sessionRole;
  const userId = otpDetails && otpDetails.user._id || login && login.user._id || sessionStorage.userId;
  const userDetails = userData && userData.user;

  console.log('USER DETAILS: ', userDetails);

  useEffect(() => {
    dispatch({ type: 'USER_BY_ID_REQUEST', userId });
  }, []);


  // email validation
  const validateEmail = (emailmsg) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(emailmsg);
  };
  const valid = validateEmail(email);

  // password validation
  const re = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;

  const updateHandler = (type) => {
    setUpdateFlag(type);
    setShowPopUp(true)
  }

  const onPhoneChange = (e) => {
    if (e.target.value.match('^[0-9]*$')) {
      setPhoneNumber(e.target.value);
    }
  };

  const onEmailChange = (e) => {
    if (e.target.value.match('^[a-zA-Z0-9_@./#&+-]*$')) {
      setEmail(e.target.value);
    }
  };

  const onAccountNumberChange = (e) => {
    if (e.target.value.match('^[0-9]*$')) {
      setBankAccountNumber(e.target.value);
    }
  };

  const onBankIfscChange = (e) => {
    if (e.target.value.match('^[a-zA-Z0-9]*$')) {
      setBankIFSCCode(e.target.value);
    }
  };

  const onPasswordChange = (e) => {
    if (e.target.value.match('^[a-zA-Z0-9!@#$%^&*]*$')) {
      setPassword(e.target.value);
    }
  };

  const onCurrentPasswordChange = (e) => {
    if (e.target.value.match('^[a-zA-Z0-9!@#$%^&*]*$')) {
      setCurrentPassword(e.target.value);
    }
  };

  const onChangeOtp = (value) => {
    setInputOtp(value)
  }

  const onChangeCancelledCheque = (e) => {
    let file = e.target.files[0];
    if (file.type.match('^([a-zA-Z0-9-_\s_\\.\-:])+(/png|/jpg|/jpeg)$')) {
      let reader = new FileReader();
      setFileLabel(file.name);
      reader.onloadend = function () {
        setChequeFile(reader.result);
      }
      reader.readAsDataURL(file);
    }
  };

  // tool tip
  const renderTooltip = (props) => (
    <Tooltip className="proofUpload-tooltip" {...props}>
      <strong>File :</strong>
      <li>type should be in .png/.jpg/.jpeg</li>
      <li>size should not exceed 3MB</li>
    </Tooltip>
  );

  const profileEditBody = () => (
    <div>
      {(updateFlag == 'phone') ?
        <React.Fragment>
          {flag ?
            <React.Fragment>
              <p>We've sent a one time password to the email <span>{email}</span></p>
              <OtpInput
                value={inputOtp}
                onChange={onChangeOtp}
                numInputs={4}
                className="otp-input"
                inputStyle="otp-input-style"
                containerStyle="otp-input-container"
                shouldAutoFocus
                isInputNum
                focusStyle="otp-focus"
              />
            </React.Fragment>
            :
            <Form.Group>
              <Form.Label>Please enter new phone number <sup className="text-danger">*</sup></Form.Label>
              <Input
                size="large"
                type="tel"
                maxLength={10}
                onChange={onPhoneChange}
                value={phoneNumber}
                className={phoneNumber.length < 10 && errorAlert}
              />
            </Form.Group>
          }
        </React.Fragment>
        : (updateFlag == 'email') ?
          <React.Fragment>
            {flag ?
              <React.Fragment>
                <p>We've sent a one time password to the email <span>{email}</span></p>
                <OtpInput
                  value={inputOtp}
                  onChange={onChangeOtp}
                  numInputs={4}
                  className="otp-input"
                  inputStyle="otp-input-style"
                  containerStyle="otp-input-container"
                  shouldAutoFocus
                  isInputNum
                  focusStyle="otp-focus"
                />
              </React.Fragment>
              :
              <Form.Group>
                <Form.Label>Please enter new email <sup className="text-danger">*</sup></Form.Label>
                <Input
                  size="large"
                  type="email"
                  onChange={onEmailChange}
                  value={email}
                  className={(!email || !valid) && errorAlert}
                />
              </Form.Group>
            }
          </React.Fragment>
          : (updateFlag == 'accountnumber') ?
            <React.Fragment>
              {flag ?
                <Form.Group>
                  <Form.Label>Upload your Cancelled Cheque <sup className="text-danger">*</sup>                          <span>
                    <OverlayTrigger placement="right-start" overlay={renderTooltip} className="proof-upload-tooltip">
                      <FontAwesomeIcon className="info-icon" icon={faInfoCircle} />
                    </OverlayTrigger>
                  </span>
                  </Form.Label>
                  <Form.File
                    type="file"
                    accept="image/*"
                    className={!chequeFile && errorAlert}
                    label={fileLabel === '' ? 'Drag and drop a file or click' : fileLabel}
                    onChange={onChangeCancelledCheque}
                    custom
                  />
                </Form.Group>
                :
                <Form.Group>
                  <Form.Label>Please enter new account number <sup className="text-danger">*</sup></Form.Label>
                  <Input
                    size="large"
                    type="text"
                    minLength={11}
                    maxLength={16}
                    onChange={onAccountNumberChange}
                    value={bankAccountNumber}
                    className={bankAccountNumber.length < 11 && errorAlert}
                  />
                </Form.Group>
              }
            </React.Fragment>
            : (updateFlag == 'bankifsc') ?
              <React.Fragment>
                {flag ?
                  <Form.Group>
                    <Form.Label>Upload your Cancelled Cheque <sup className="text-danger">*</sup>                          <span>
                      <OverlayTrigger placement="right-start" overlay={renderTooltip} className="proof-upload-tooltip">
                        <FontAwesomeIcon className="info-icon" icon={faInfoCircle} />
                      </OverlayTrigger>
                    </span>
                    </Form.Label>
                    <Form.File
                      type="file"
                      accept="image/*"
                      className={!chequeFile && errorAlert}
                      label={fileLabel === '' ? 'Drag and drop a file or click' : fileLabel}
                      onChange={onChangeCancelledCheque}
                      custom
                    />
                  </Form.Group>
                  :
                  <Form.Group>
                    <Form.Label>Please enter new bank IFSC <sup className="text-danger">*</sup></Form.Label>
                    <Input
                      size="large"
                      type="text"
                      maxLength={11}
                      onChange={onBankIfscChange}
                      value={bankIFSCCode}
                      className={bankIFSCCode.length < 11 && errorAlert}
                    />
                  </Form.Group>
                }
              </React.Fragment>
              : updateFlag == 'password' ?
                <React.Fragment>
                  <Form.Group>
                    <Form.Label>Please enter current password <sup className="text-danger">*</sup></Form.Label>
                    <Input
                      size="large"
                      type="text"
                      onChange={onCurrentPasswordChange}
                      value={currentPassword}
                      className={!currentPassword && errorAlert}
                    />
                    <Form.Label>Please enter new password <sup className="text-danger">*</sup></Form.Label>
                    <Input
                      size="large"
                      type="text"
                      onChange={onPasswordChange}
                      value={password}
                      className={(!password || !re.test(password)) && errorAlert}
                    />
                  </Form.Group>
                </React.Fragment>
                : null
      }
    </div>
  )

  const onSubmit = () => {
    if (updateFlag == 'phone' && !flag) {
      if (phoneNumber.length < 10) {
        setAlertMsg('Please enter a valid phone number');
        setErrorAlert('error-alert')
      }
      else {
        setAlertMsg('');
        setErrorAlert('');
        setFlag(true)
        // dispatch({ type: 'LOGIN_REQUEST', loginDetails });
      }
    } else if (updateFlag == 'phone' && flag) {
      if (!inputOtp) {
        setAlertMsg('Please enter the OTP');
        setErrorAlert('error-alert');
      }
      else {
        // dispatch({ type: 'LOGIN_REQUEST', loginDetails });
      }

    } else if (updateFlag == 'email' && !flag) {
      if (!email || !valid) {
        setAlertMsg('Please enter a valid email')
        setErrorAlert('error-alert');
      }
      else {
        setAlertMsg('');
        setErrorAlert('');
        setFlag(true)
        // dispatch({ type: 'LOGIN_REQUEST', loginDetails });
      }
    } else if (updateFlag == 'email' && flag) {
      if (!inputOtp) {
        setAlertMsg('Please enter the OTP');
        setErrorAlert('error-alert');
      }
      else {
        // dispatch({ type: 'LOGIN_REQUEST', loginDetails });
      }

    } else if (updateFlag == 'accountnumber' && !flag) {
      if (bankAccountNumber.length < 11) {
        setAlertMsg('Please enter a valid account number of minimum (11) characters');
        setErrorAlert('error-alert');
      }
      else {
        setAlertMsg('');
        setErrorAlert('')
        setFlag(true);
      }
    } else if (updateFlag == 'accountnumber' && flag) {
      if (!chequeFile) {
        setAlertMsg('Please upload a valid file');
        setErrorAlert('file-not-upload');
      }
      else {
        // dispatch({ type: 'LOGIN_REQUEST', loginDetails });
      }
    } else if (updateFlag == 'bankifsc' && !flag) {
      if (bankIFSCCode.length !== 11) {
        setAlertMsg('Please enter a valid bank IFSC code of (11) characters');
        setErrorAlert('error-alert');
      }
      else {
        setAlertMsg('');
        setErrorAlert('')
        setFlag(true);
      }
    } else if (updateFlag == 'bankifsc' && flag) {
      if (!chequeFile) {
        setAlertMsg('Please upload a valid file');
        setErrorAlert('file-not-upload');
      }
      else {
        // dispatch({ type: 'LOGIN_REQUEST', loginDetails });
      }
    } else if (updateFlag == 'password') {
      if (!password) {
        setAlertMsg('Password should be minimum of (8) characters ');
        setErrorAlert('error-alert')
      }
      else if (re.test(password) == false) {
        setAlertMsg('Password should contain at least one (1) uppercase letter (A-Z), lowercase letter (a-z), number & special characters (!@#$%^&*)');
        setErrorAlert('error-alert')
      }
      // else if (currentPassword !== responsepassword){
      //   setAlertMsg('Please enter correct current password');
      //   setErrorAlert('error-alert');
      // }
      else {
        // dispatch({ type: 'LOGIN_REQUEST', loginDetails });
      }
    }
  }

  const handleClose = () => {
    setAlertMsg('');
    setErrorAlert('');
    setChequeFile('')
    setFileLabel('')
    setPhoneNumber('');
    setEmail('');
    setBankAccountNumber('');
    setBankIFSCCode('');
    setPassword('');
    setShowPopUp(false)
    setFlag(false)
  }

  const imageOne = userDetails && userDetails.documents.authenticationLetterForClientUrl || userDetails && userDetails.documents.aadhaarUrl || userDetails && userDetails.documents.authenticationLetterForCompanyUrl;
  const imageTwo = userDetails && userDetails.documents.companyIdForClient || userDetails && userDetails.documents.companyIdForCompany || userDetails && userDetails.documents.cancelledChequeUrl;
  const imageThree = userDetails && userDetails.documents.pancardUrl;

  const alertClassName = 'danger';

  return (
    <React.Fragment>
      <div className="main">
        <SideMenuBar ref={sideBarRef} />
        <div className="rightsidepane">
          <Header title="User Profile" />
          <div className="container-main">
            <Row className="personal-content mr-0">
              <Card className="personal-details shadow mb-5">
                <Row className='d-flex ml-2 mr-2'>
                  <Col lg={6} sm={6} md={6}>
                    <Form.Group>
                      {(role === 'Company Representative' || role === 'Client Representative') && <Form.Label>Representative ID</Form.Label>}
                      {role === 'Employee' && <Form.Label>Employee ID</Form.Label>}
                      <Input
                        size="large"
                        type="text"
                        disabled
                        value={userDetails && userDetails._id}
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={6} sm={6} md={6}>
                    <Form.Group>
                      <Form.Label>Name</Form.Label>
                      <Input
                        size="large"
                        type="text"
                        disabled
                        value={role === 'Employee' ? `${userDetails && userDetails.firstName} ${userDetails && `${userDetails.middleName} `}${userDetails && userDetails.lastName}` : userDetails && userDetails.name}
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={6} sm={6} md={6}>
                    <Form.Group>
                      <Form.Label>Email</Form.Label>
                      <Input
                        size="large"
                        type="email"
                        suffix={role == 'Employee' ? null : <EditFilled onClick={() => { updateHandler('email') }} />}
                        disabled
                        value={userDetails && userDetails.email}
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={6} sm={6} md={6}>
                    <Form.Group>
                      <Form.Label>Phone</Form.Label>
                      <Input
                        size="large"
                        type="tel"
                        maxLength={10}
                        suffix={<EditFilled onClick={() => { updateHandler('phone') }} />}
                        disabled
                        value={userDetails && userDetails.phoneNumber}
                      />
                    </Form.Group>
                  </Col>
                  {(role === 'Company Representative' || role === 'Client Representative') &&
                    <Col lg={6} sm={6} md={6}>
                      <Form.Group>
                        <Form.Label>Company Name</Form.Label>
                          <Select
                            isMulti
                            isDisabled
                            className="company-select-list"
                            value={userDetails && userDetails.companies}
                          />
                      </Form.Group>
                    </Col>
                  }
                  {role === 'Employee' &&
                    <React.Fragment>
                      <Col lg={6} sm={6} md={6}>
                        <Form.Group>
                          <Form.Label>Current Group</Form.Label>
                          <Input
                            size="large"
                            type="text"
                            suffix={<InfoCircleOutlined />}
                            disabled
                          />
                        </Form.Group>
                      </Col>
                      <Col lg={6} sm={6} md={6}>
                        <Form.Group>
                          <Form.Label>Current Pillar</Form.Label>
                          <Input
                            size="large"
                            type="text"
                            suffix={<InfoCircleOutlined />}
                            disabled
                          />
                        </Form.Group>
                      </Col>
                      <Col lg={6} sm={6} md={6}>
                        <Form.Group>
                          <Form.Label>Account Number</Form.Label>
                          <Input
                            size="large"
                            type="text"
                            minLength={11}
                            maxLength={16}
                            suffix={<EditFilled onClick={() => { updateHandler('accountnumber') }} />}
                            disabled
                            value={userDetails && userDetails.bankAccountNumber}
                          />
                        </Form.Group>
                      </Col>
                      <Col lg={6} sm={6} md={6}>
                        <Form.Group>
                          <Form.Label>Bank IFSC</Form.Label>
                          <Input
                            size="large"
                            type="text"
                            maxLength={11}
                            suffix={<EditFilled onClick={() => { updateHandler('bankifsc') }} />}
                            disabled
                            value={userDetails && userDetails.bankIFSCCode}
                          />
                        </Form.Group>
                      </Col>
                      <Col lg={6} sm={6} md={6}>
                        <Form.Group>
                          <Form.Label>Pan Card Number</Form.Label>
                          <Input
                            size="large"
                            type="text"
                            disabled
                            value={userDetails && userDetails.panNumber}
                          />
                        </Form.Group>
                      </Col>
                    </React.Fragment>
                  }
                  <Col lg={6} sm={6} md={6}>
                    <Form.Group>
                      <Form.Label>Password</Form.Label>
                      <Input
                        size="large"
                        type="password"
                        suffix={<EditFilled onClick={() => { updateHandler('password') }} />}
                        disabled
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <div className="profile-image-container">
                  <Row className='d-flex ml-2 mr-2'>
                    <Col lg={4} sm={4} md={4} className="profile-image">
                      <Form.Group>
                        <Form.Label>{role == 'Employee' ? 'Aadhar Card ' : 'Letter of authentication '}</Form.Label><br></br>
                        <Image
                          width={200}
                          src={imageOne}
                          alt='image'
                        />
                      </Form.Group>
                    </Col>
                    <Col lg={4} sm={4} md={4} className="profile-image">
                      <Form.Group>
                        <Form.Label>{role == 'Employee' ? 'Cancelled Cheque ' : role == 'Company Representative' ? 'Company ID Proof ' : 'Employee ID Proof '}</Form.Label><br></br>
                        <Image
                          width={200}
                          src={imageTwo}
                          alt='image'
                        />
                      </Form.Group>
                    </Col>
                    {role == 'Employee' &&
                      <Col lg={4} sm={4} md={4} className="profile-image">
                        <Form.Group>
                          <Form.Label>Pan Card</Form.Label><br></br>
                          <Image
                            width={200}
                            src={imageThree}
                            alt='image'
                          />
                        </Form.Group>
                      </Col>
                    }
                  </Row>
                </div>
              </Card>
            </Row>
          </div>
        </div>
      </div>
      <Overlay
        className="text-center otp-modal"
        title="Authentication Required"
        show={showPopUp}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        animation
        centered
        size="md"
        body={profileEditBody()}
        primary="Submit"
        onSubmitPrimary={onSubmit}
        alert={alertMsg}
        alertClass={alertClassName}
      />
    </React.Fragment>
  );
};

export default UserProfile;
