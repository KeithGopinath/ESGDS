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
import { message } from 'antd';
import Select from 'react-select';
import { CheckCircleFilled, InfoCircleOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const UserProfile = () => {
  const sideBarRef = useRef();
  const [showEdit, setShowEdit] = useState(true);
  const [showPopUp, setShowPopUp] = useState(false);
  const [updateFlag, setUpdateFlag] = useState();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneFlag, setPhoneFlag] = useState(false);
  const [email, setEmail] = useState('');
  const [emailFlag, setEmailFlag] = useState(false);
  const [bankAccountNumber, setBankAccountNumber] = useState('');
  const [bankAccountNumberFlag, setBankAccountNumberFlag] = useState(false);
  const [bankIFSCCode, setBankIFSCCode] = useState('');
  const [bankIFSCCodeFlag, setBankIFSCCodeFlag] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordFlag, setPasswordFlag] = useState(false);
  const [inputOtp, setInputOtp] = useState('');
  const [chequeFile, setChequeFile] = useState();
  const [fileLabel, setFileLabel] = useState('');
  const [alertMsg, setAlertMsg] = useState('');
  const [errorAlert, setErrorAlert] = useState('');

  const role = 'employee'
  // const role = 'client'
  // const role = 'company'

  // email validation
  const validateEmail = (emailmsg) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(emailmsg);
  };
  const valid = validateEmail(email);

  // password validation
  const re = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;

  const editHandler = () => {
    setShowEdit(false)
  }

  const updateHandler = (type) => {
    if (type == 'phone') {
      if (phoneNumber.length < 10) {
        message.error('Please enter a valid phone number');
        setErrorAlert('error-alert')
      }
      else {
        setShowPopUp(true);
        setUpdateFlag(type);
        setErrorAlert('')
      }
    } else if (type == 'email') {
      if (!email || valid == false) {
        message.error('Please enter a valid email');
        setErrorAlert('error-alert')
      }
      else {
        setShowPopUp(true);
        setUpdateFlag(type);
        setErrorAlert('')
      }
    } else if (type == 'accountnumber') {
      if (!bankAccountNumber) {
        message.error('Please enter a valid account number');
        setErrorAlert('error-alert')
      }
      else {
        setShowPopUp(true);
        setUpdateFlag(type);
        setErrorAlert('')
      }
    } else if (type == 'bankifsc') {
      if (!bankIFSCCode) {
        message.error('Please enter a valid IFSC code');
        setErrorAlert('error-alert')
      }
      else {
        setShowPopUp(true);
        setUpdateFlag(type);
        setErrorAlert('')
      }
    } else if (type == 'password') {
      if (!password) {
        message.error('Password should be minimum of (8) characters ');
        setErrorAlert('error-alert')
      }
      else if (re.test(password) == false) {
        message.error('Password should contain at least one (1) uppercase letter (A-Z), lowercase letter (a-z), number & special characters (!@#$%^&*)');
        setErrorAlert('error-alert')
      }
      else {
        setShowPopUp(true);
        setUpdateFlag(type);
        setErrorAlert('')
      }
    }
  }

  const onPhoneChange = (e) => {
    if (e.target.value.match('^[0-9]*$')) {
      setPhoneNumber(e.target.value);
      setPhoneFlag(true)
    }
  };

  const onEmailChange = (e) => {
    if (e.target.value.match('^[a-zA-Z0-9_@./#&+-]*$')) {
      setEmail(e.target.value);
      setEmailFlag(true);
    }
  };

  const onAccountNumberChange = (e) => {
    if (e.target.value.match('^[0-9]*$')) {
      setBankAccountNumber(e.target.value);
      setBankAccountNumberFlag(true);
    }
  };

  const onBankIfscChange = (e) => {
    if (e.target.value.match('^[a-zA-Z0-9]*$')) {
      setBankIFSCCode(e.target.value);
      setBankIFSCCodeFlag(true);
    }
  };

  const onPasswordChange = (e) => {
    if (e.target.value.match('^[a-zA-Z0-9!@#$%^&*]*$')) {
      setPassword(e.target.value);
      setPasswordFlag(true);
    }
  };

  const onChangeOtp = (e) => {
    setInputOtp(e.target.value)
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
      {(updateFlag == 'phone' || updateFlag == 'email') ?
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
        : (updateFlag == 'accountnumber' || updateFlag == 'bankifsc') ?
          <React.Fragment>
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
          </React.Fragment>
          : updateFlag == 'password' ?
            <React.Fragment>
              <Form.Group>
                <Form.Label>Please enter current password <sup className="text-danger">*</sup></Form.Label>
                <Input
                  size="large"
                  type="text"
                // onChange={onEmailChange}
                // value={email}
                // className={role == 'employee' ? '' : !email && errorAlert}
                />
                <Form.Label>Please enter updated password again <sup className="text-danger">*</sup></Form.Label>
                <Input
                  size="large"
                  type="text"
                // onChange={onEmailChange}
                // value={email}
                // className={role == 'employee' ? '' : !email && errorAlert}
                />
              </Form.Group>
            </React.Fragment>
            : null
      }
    </div>
  )

  const onSubmit = () => {
    if (updateFlag == 'phone') {
      setAlertMsg('Phone number updated successfully')
    }
    else if (updateFlag == 'accountnumber' || updateFlag == 'bankifsc') {
      if (!chequeFile) {
        setAlertMsg('Please upload a valid file')
        setErrorAlert('file-not-upload')
      }
      else {
        console.log(chequeFile);
        setErrorAlert('')
        // dispatch({ type: 'LOGIN_REQUEST', loginDetails });
      }
    }

  }

  const handleClose = () => {
    setAlertMsg('');
    setErrorAlert('');
    setChequeFile('')
    setFileLabel('')
    setShowPopUp(false)
  }

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
                      {(role === 'client' || role === 'company') && <Form.Label>Representative ID <sup className="text-danger">*</sup></Form.Label>}
                      {role === 'employee' && <Form.Label>Employee ID <sup className="text-danger">*</sup></Form.Label>}
                      <Input
                        size="large"
                        type="text"
                        disabled
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={6} sm={6} md={6}>
                    <Form.Group>
                      <Form.Label>Name <sup className="text-danger">*</sup></Form.Label>
                      <Input
                        size="large"
                        type="text"
                        disabled
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={6} sm={6} md={6}>
                    <Form.Group>
                      <Form.Label>Email <sup className="text-danger">*</sup></Form.Label>
                      <Input
                        size="large"
                        type="email"
                        suffix={role == 'employee' ? null : emailFlag && <CheckCircleFilled onClick={() => { updateHandler('email') }} />}
                        onChange={onEmailChange}
                        value={email}
                        className={role == 'employee' ? '' : !email && errorAlert}
                        disabled={role == 'employee' ? true : showEdit}
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={6} sm={6} md={6}>
                    <Form.Group>
                      <Form.Label>Phone <sup className="text-danger">*</sup></Form.Label>
                      <Input
                        size="large"
                        type="tel"
                        maxLength={10}
                        suffix={phoneFlag && <CheckCircleFilled onClick={() => { updateHandler('phone') }} />}
                        onChange={onPhoneChange}
                        value={phoneNumber}
                        className={phoneNumber.length < 10 && errorAlert}
                        disabled={showEdit}
                      />
                    </Form.Group>
                  </Col>
                  {(role === 'company' || role === 'client') &&
                    <Col lg={6} sm={6} md={6}>
                      <Form.Group>
                        <Form.Label>Company Name <sup className="text-danger">*</sup></Form.Label>
                        {role === 'company' ?
                          <Select
                            isMulti
                            //  value={companyNameList}
                            isDisabled
                            className="company-select-list"
                          /> :
                          <Input
                            size="large"
                            type="tel"
                            disabled
                          />}
                      </Form.Group>
                    </Col>
                  }
                  {role === 'employee' &&
                    <React.Fragment>
                      <Col lg={6} sm={6} md={6}>
                        <Form.Group>
                          <Form.Label>Current Group <sup className="text-danger">*</sup></Form.Label>
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
                          <Form.Label>Current Pillar <sup className="text-danger">*</sup></Form.Label>
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
                          <Form.Label>Account Number <sup className="text-danger">*</sup></Form.Label>
                          <Input
                            size="large"
                            type="text"
                            minLength={11}
                            maxLength={16}
                            suffix={bankAccountNumberFlag && <CheckCircleFilled onClick={() => { updateHandler('accountnumber') }} />}
                            onChange={onAccountNumberChange}
                            value={bankAccountNumber}
                            className={!bankAccountNumber && errorAlert}
                            disabled={showEdit}
                          />
                        </Form.Group>
                      </Col>
                      <Col lg={6} sm={6} md={6}>
                        <Form.Group>
                          <Form.Label>Bank IFSC <sup className="text-danger">*</sup></Form.Label>
                          <Input
                            size="large"
                            type="text"
                            maxLength={11}
                            suffix={bankIFSCCodeFlag && <CheckCircleFilled onClick={() => { updateHandler('bankifsc') }} />}
                            onChange={onBankIfscChange}
                            value={bankIFSCCode}
                            className={!bankIFSCCode && errorAlert}
                            disabled={showEdit}
                          />
                        </Form.Group>
                      </Col>
                      <Col lg={6} sm={6} md={6}>
                        <Form.Group>
                          <Form.Label>Pan Card Number <sup className="text-danger">*</sup></Form.Label>
                          <Input
                            size="large"
                            type="text"
                            disabled
                          />
                        </Form.Group>
                      </Col>
                    </React.Fragment>
                  }
                  <Col lg={6} sm={6} md={6}>
                    <Form.Group>
                      <Form.Label>Password <sup className="text-danger">*</sup></Form.Label>
                      <Input
                        size="large"
                        type="password"
                        suffix={passwordFlag && <CheckCircleFilled onClick={() => { updateHandler('password') }} />}
                        onChange={onPasswordChange}
                        value={password}
                        className={(!password || !re.test(password)) && errorAlert}
                        disabled={showEdit}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <div className="profile-image-container">
                  <Row className='d-flex ml-2 mr-2'>
                    <Col lg={4} sm={4} md={4} className="profile-image">
                      <Form.Group>
                        <Form.Label>{role == 'employee' ? 'Aadhar Card ' : 'Letter of authentication '}<sup className="text-danger">*</sup></Form.Label><br></br>
                        <Image
                          width={200}
                          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                          alt='image'
                        />
                      </Form.Group>
                    </Col>
                    <Col lg={4} sm={4} md={4} className="profile-image">
                      <Form.Group>
                        <Form.Label>{role == 'employee' ? 'Cancelled Cheque ' : role == 'company' ? 'Company ID Proof ' : 'Employee ID Proof '}<sup className="text-danger">*</sup></Form.Label><br></br>
                        <Image
                          width={200}
                          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                          alt='image'
                        />
                      </Form.Group>
                    </Col>
                    {role == 'employee' &&
                      <Col lg={4} sm={4} md={4} className="profile-image">
                        <Form.Group>
                          <Form.Label>Pan Card <sup className="text-danger">*</sup></Form.Label><br></br>
                          <Image
                            width={200}
                            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                            alt='image'
                          />
                        </Form.Group>
                      </Col>
                    }
                  </Row>
                </div>
                <React.Fragment>
                  <div className="approve-button-container">
                    {showEdit && <Button onClick={editHandler}>Edit Profile</Button>}
                  </div>
                </React.Fragment>
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
