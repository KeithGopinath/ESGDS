/*eslint-disable*/
import React, { useState, useEffect } from 'react';
import { Card, Form, Row, Col, Container, Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { message } from 'antd';
import Select from 'react-select';
import { useSelector, useDispatch } from 'react-redux';
import { Image } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import UserStatusManage from '../../containers/UserStatusManage';
import PageLoader from '../../components/PageLoader';

const PersonalDetails = ({ role, onFirstName, onMiddleName, onLastName, onEmail, onPhone,
  onPancard, onAadhar, onBankAccount, onBankIfsc, onCompanyName, nextStep, setActiveStep,
  activeStep, validatingSpaces, flag, userDetails, getMailId, userTypes }) => {

  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [lastName, setLastName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [pancardNumber, setPancardNumber] = useState('');
  const [adharCard, setAdharCard] = useState('');
  const [bankAccountNumber, setBankAccountNumber] = useState('');
  const [bankIFSCCode, setBankIFSCCode] = useState('');
  const [validate, setValidate] = useState(false);
  const [show, setShow] = useState(false);
  const [decision, setDecision] = useState('');
  const [enableFields, setEnableFields] = useState(flag);
  const [userId, setUserId] = useState('');
  const [save, setSave] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (flag) {
      setFirstName(userDetails && userDetails.firstName ? userDetails.firstName : userDetails && userDetails.name);
      setMiddleName(userDetails && userDetails.middleName);
      setLastName(userDetails && userDetails.lastName);
      setEmail(userDetails && userDetails.email);
      setPhoneNumber(userDetails && userDetails.phoneNumber);
      setPancardNumber(userDetails && userDetails.panNumber);
      setAdharCard(userDetails && userDetails.aadhaarNumber);
      setBankAccountNumber(userDetails && userDetails.bankAccountNumber);
      setBankIFSCCode(userDetails && userDetails.bankIFSCCode);
      setCompanyName(userDetails && userDetails.companies);
      setUserId(userDetails && userDetails._id);
    }
  }, [userDetails]);

  useEffect(() => {
    if (role === 'company' || role === 'client') {
      dispatch({ type: 'COMPANY_LIST_REQUEST' });
    }
  }, [role]);

  // Getting the list of companies
  const companyData = useSelector((companylist) => companylist.companylist.companydata);
  const companyDataLoading = useSelector((state) => state.companylist.isLoading);

  const fullList = companyData && companyData.rows;

  const companyList = fullList ? fullList && fullList.map((args) => ({
    value: args.id, label: args.companyName,
  })) : [];

  const onFirstNameChange = (e) => {
    if (e.target.value.match('^[a-zA-Z ]*$')) {
      setFirstName(e.target.value);
      onFirstName(e.target.value);
    }
  };

  const onMiddleNameChange = (e) => {
    if (e.target.value.match('^[a-zA-Z ]*$')) {
      setMiddleName(e.target.value);
      onMiddleName(e.target.value);
    }
  };

  const onLastNameChange = (e) => {
    if (e.target.value.match('^[a-zA-Z ]*$')) {
      setLastName(e.target.value);
      onLastName(e.target.value);
    }
  };

  const onPhoneChange = (e) => {
    if (e.target.value.match('^[0-9]*$')) {
      setPhoneNumber(e.target.value);
      onPhone(e.target.value);
    }
  };

  const onPancardNoChange = (e) => {
    if (e.target.value.match('^[a-zA-Z0-9]*$')) {
      setPancardNumber(e.target.value.toUpperCase());
      onPancard(e.target.value.toUpperCase());
    }
  };

  const onAadharNoChange = (e) => {
    if (e.target.value.match('^[0-9]*$')) {
      setAdharCard(e.target.value);
      onAadhar(e.target.value);
    }
  };

  // CLient and Company Reps has choose multiple companies
  const onCompanyNameSelect = (companySelect) => {
    setCompanyName(companySelect);
    // onCompanyName(companySelect);

  };

  // Client Rep only one company Choosen
  // const onCompanyClientSelect = (companySelect) => {
  //   setCompanyName(companySelect);
  //   onCompanyName(companySelect.value);
  // }

  const onAccountNumberChange = (e) => {
    if (e.target.value.match('^[0-9]*$')) {
      setBankAccountNumber(e.target.value);
      onBankAccount(e.target.value);
    }
  };

  const onBankIfscChange = (e) => {
    if (e.target.value.match('^[a-zA-Z0-9]*$')) {
      setBankIFSCCode(e.target.value.toUpperCase());
      onBankIfsc(e.target.value.toUpperCase());
    }
  };

  // pancard tooltip
  const renderTooltip = (props) => (
    <Tooltip className="password-tooltip" {...props}>
      Pancard number format RAJES9876H
    </Tooltip>
  );

  // ifsc tooltip
  const ifscTooltip = (props) => (
    <Tooltip className="password-tooltip" {...props}>
      IFSC code format SBIN0001111
    </Tooltip>
  );

  // save & continue button
  const gotoProofUpload = () => {
    const valid = validatingSpaces(email);
    const re = /^[6-9]{1}[0-9]{9}$/;
    const pancardRe = /^[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}$/;
    const ifscCode = /^[A-Za-z]{4}[0-9]{7}$/
    if (role === 'client' || role === 'company') {
      if (!phoneNumber && valid === false) {
        message.error('Please fill all required fields');
        setValidate('border-danger');
      } else if (!firstName || !phoneNumber) {
        message.error('Please fill all required fields');
        setValidate('border-danger');
      } else if (phoneNumber && !re.test(phoneNumber)) {
        message.error('Please enter valid mobile number');
        setValidate("mobile");
      } else if ((firstName.length && phoneNumber.length) > 0) {
        nextStep();
        setValidate('');
        setActiveStep(activeStep + 1);
      }
    }
    else if (role === 'employee') {
      if (!pancardNumber && !bankAccountNumber && !bankIFSCCode && !adharCard && valid === false) {
        message.error('Please fill all required fields');
        setValidate('border-danger');
      } else if (!firstName || !lastName || !phoneNumber || !pancardNumber || !bankAccountNumber || !bankIFSCCode || !adharCard) {
        message.error('Please fill all required fields');
        setValidate('border-danger');
      } else if (phoneNumber && !re.test(phoneNumber)) {
        message.error('Please enter valid mobile number');
        setValidate("mobile");
      } else if (adharCard.length < 12) {
        message.error('Should aadhar number have 12 digits');
        setValidate('border-danger');
      } else if (pancardNumber && !pancardRe.test(pancardNumber)) {
        message.error('Please enter valid pancard number');
        setValidate(true);
      } else if (bankAccountNumber && bankAccountNumber.length < 11) {
        message.error('Account number has minmum 11 digits & maximum 16 digits');
        setValidate('border-danger');
      } else if (bankIFSCCode && bankIFSCCode.length !== 11) {
        message.error('IFSC code has 11 characters');
        setValidate('ifsc');
      } else if (bankIFSCCode && !ifscCode.test(bankIFSCCode)) {
        message.error('Please enter proper IFSC code');
        setValidate('ifsc');
      } else {
        nextStep();
        setValidate('');
        setActiveStep(activeStep + 1);
      }
    }
  };

  const handleClose = () => {
    setShow(false)
  }

  const handleShow = (e) => {
    if (e === 'approve') {
      if (Array.isArray(companyName) && companyName.length < 1) {
        message.error('Please choose companies');
        setValidate('border-danger');
      } else {
        setValidate('');
        setDecision(e);
        setShow(true);
      }
    }
    else {
      setDecision(e);
      setShow(true);
    }
  }

  const editUser = () => {
    setEnableFields(false);
    setSave(true);
  }

  const onSave = (e) => {
    if (e === 'save') {
      if (Array.isArray(companyName) && companyName.length < 1) {
        message.error('Please choose companies');
        setValidate('border-danger');
      } else {
        setValidate('');
        setDecision(e);
        setShow(true);
      }
    }
  }

  //while approve the user companies assign to the user
  const assingCompanies = () => {
    const Payload = {
      userId: userId,
      type: role,
      companies: companyName
    };
    dispatch({ type: 'USER_ASSIGN_COMPANIES_REQUEST', Payload });
  }

  // Images in different types
  const imageOne = userDetails && userDetails.documents.authenticationLetterForClientUrl || userDetails && userDetails.documents.aadhaarUrl || userDetails && userDetails.documents.authenticationLetterForCompanyUrl;
  const imageTwo = userDetails && userDetails.documents.companyIdForClient || userDetails && userDetails.documents.companyIdForCompany || userDetails && userDetails.documents.cancelledChequeUrl;
  const imageThree = userDetails && userDetails.documents.pancardUrl;

  return (
    companyDataLoading ? <PageLoader /> : <Container>
      <Row className="personal-content mr-0">
        <Card className="personal-details shadow mb-5">
          <h4 className="personal-text">Personal Details</h4>
          <Row className='d-flex ml-2 mr-2'>
            <Col lg={role === 'employee' ? 6 : 4} sm={role === 'employee' ? 6 : 4} md={role === 'employee' ? 6 : 4}>
              <Form.Group>
                {(role === 'client' || role === 'company') && <Form.Label>Name {!flag ? <sup className="text-danger">*</sup> : ''}</Form.Label>}
                {role === 'employee' && <Form.Label>First Name {!flag ? <sup className="text-danger">*</sup> : ''}</Form.Label>}
                <Form.Control
                  className={!firstName && validate}
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={firstName}
                  placeholder={`${role === 'employee' ? "Enter your first name" : "Enter your name"}`}
                  onChange={onFirstNameChange}
                  name={firstName}
                  disabled={enableFields}
                />
              </Form.Group>
            </Col>
            {role === 'employee' &&
              <React.Fragment>
                <Col lg={6} sm={6} md={6}>
                  <Form.Group>
                    <Form.Label>Middle Name</Form.Label>
                    <Form.Control
                      className=""
                      type="text"
                      name="middleName"
                      id="middleName"
                      placeholder="Optional"
                      value={middleName}
                      onChange={onMiddleNameChange}
                      disabled={enableFields}
                    />
                  </Form.Group>
                </Col>
                <Col lg={6} sm={6} md={6}>
                  <Form.Group>
                    <Form.Label>Last Name {!flag ? <sup className="text-danger">*</sup> : ''}</Form.Label>
                    <Form.Control
                      className={!lastName && validate}
                      type="text"
                      name="lastName"
                      id="lastName"
                      value={lastName}
                      placeholder="Enter your last name"
                      onChange={onLastNameChange}
                      disabled={enableFields}
                    />
                  </Form.Group>
                </Col>
              </React.Fragment>
            }
            <Col lg={role === 'employee' ? 6 : 4} sm={role === 'employee' ? 6 : 4} md={role === 'employee' ? 6 : 4}>
              <Form.Group>
                <Form.Label>Email {!flag ? <sup className="text-danger">*</sup> : ''}</Form.Label>
                <Form.Control
                  className={(email === '' || !flag && validatingSpaces(email) === false)}
                  type="text"
                  name="email"
                  id="email"
                  value={flag ? email : getMailId}
                  disabled={enableFields || true}
                />
              </Form.Group>
            </Col>
            <Col lg={role === 'employee' ? 6 : 4} sm={role === 'employee' ? 6 : 4} md={role === 'employee' ? 6 : 4}>
              <Form.Group>
                <Form.Label>Phone {!flag ? <sup className="text-danger">*</sup> : ''}</Form.Label>
                <Form.Control
                  className={!phoneNumber && validate || phoneNumber && validate === 'mobile' ? 'border-danger' : ''}
                  type="tel"
                  name="phone"
                  id="phone"
                  value={phoneNumber}
                  maxLength={10}
                  placeholder="Enter your valid phone number"
                  onChange={onPhoneChange}
                  disabled={enableFields}
                />
              </Form.Group>
            </Col>
            {flag && (role === 'company' || role === 'client') &&
              <Col lg={12} sm={12} md={12}>
                <Form.Group>
                  <Form.Label>Company Name <sup className="text-danger">*</sup></Form.Label>
                  <div className={((!companyName || companyName) && validate) ? 'dropdown-alert' : ''}>
                    <Select
                      isMulti
                      options={companyList}
                      name="companyName"
                      value={companyName}
                      onChange={onCompanyNameSelect}
                      isDisabled={userTypes === 'Pending' ? false : userTypes === 'Approved' ? enableFields : false}
                    />
                  </div>
                </Form.Group>
              </Col>}
            {role === 'employee' &&
              <React.Fragment>
                <Col lg={6} sm={6} md={6}>
                  <Form.Group>
                    <Form.Label>Pan Card Number {!flag ? <React.Fragment><sup className="text-danger">*</sup><span>
                      <OverlayTrigger placement="right" overlay={renderTooltip} className="password-tooltip">
                        <FontAwesomeIcon className="info-icon" icon={faInfoCircle} />
                      </OverlayTrigger>
                    </span> </React.Fragment> : ''}
                    </Form.Label>
                    <Form.Control
                      className={!pancardNumber && validate || (pancardNumber && validate === true ? 'border-danger' : '')}
                      type="text"
                      maxLength={10}
                      name="pancardNumber"
                      id="pancardNumber"
                      value={pancardNumber}
                      placeholder="Enter your pancard number"
                      onChange={onPancardNoChange}
                      disabled={enableFields}
                    />
                  </Form.Group>
                </Col>
                <Col lg={6} sm={6} md={6}>
                  <Form.Group>
                    <Form.Label>Aadhar Number {!flag ? <sup className="text-danger">*</sup> : ''}</Form.Label>
                    <Form.Control
                      className={(!adharCard || adharCard && adharCard.length < 12) && validate}
                      type="tel"
                      maxLength={12}
                      name="aadharNumber"
                      id="aadharNumber"
                      value={adharCard}
                      placeholder="Enter your aadhar number"
                      onChange={onAadharNoChange}
                      disabled={enableFields}
                    />
                  </Form.Group>
                </Col>
                <Col lg={6} sm={6} md={6}>
                  <Form.Group>
                    <Form.Label>Account Holder Name {!flag ? <sup className="text-danger">*</sup> : ''}</Form.Label>
                    <Form.Control
                      type="text"
                      name="accHolderName"
                      id="accHolderName"
                      value={`${firstName} ${middleName && `${middleName} `}${lastName}`}
                      readOnly
                      placeholder="Same as your name"
                    />
                  </Form.Group>
                </Col>
                <Col lg={6} sm={6} md={6}>
                  <Form.Group>
                    <Form.Label>Account Number {!flag ? <sup className="text-danger">*</sup> : ''}</Form.Label>
                    <Form.Control
                      className={!bankAccountNumber && validate}
                      type="tel"
                      minLength={11}
                      maxLength={16}
                      name="bankAccountNumber"
                      id="bankAccountNumber"
                      value={bankAccountNumber}
                      placeholder="Enter your account number"
                      onChange={onAccountNumberChange}
                      disabled={enableFields}
                    />
                  </Form.Group>
                </Col>
                <Col lg={6} sm={6} md={6}>
                  <Form.Group>
                    <Form.Label>Bank IFSC {!flag ? <React.Fragment>
                      <sup className="text-danger">*</sup>
                      <span>
                        <OverlayTrigger placement="right" overlay={ifscTooltip} className="password-tooltip">
                          <FontAwesomeIcon className="info-icon" icon={faInfoCircle} />
                        </OverlayTrigger>
                      </span>
                    </React.Fragment> : ''}</Form.Label>
                    <Form.Control
                      className={!bankIFSCCode && validate || bankIFSCCode && validate === 'ifsc' ? 'border-danger' : ''}
                      type="text"
                      name="bankIFSC"
                      id="bankIFSC"
                      maxLength={11}
                      value={bankIFSCCode}
                      placeholder="Enter your IFSC code"
                      onChange={onBankIfscChange}
                      disabled={enableFields}
                    />
                  </Form.Group>
                </Col>
              </React.Fragment>
            }
          </Row>
          {flag &&
            <div className="profile-image-container">
              <Row className='d-flex ml-2 mr-2'>
                <Col lg={4} sm={4} md={4} className="profile-image">
                  <Form.Group>
                    <Form.Label>{role == 'employee' ? 'Aadhar Card ' : 'Letter of authentication '}{!flag ? <sup className="text-danger">*</sup> : ''}</Form.Label><br></br>
                    <Image
                      width={200}
                      src={imageOne}
                      alt='image'
                    />
                  </Form.Group>
                </Col>
                <Col lg={4} sm={4} md={4} className="profile-image">
                  <Form.Group>
                    <Form.Label>{role == 'employee' ? 'Cancelled Cheque ' : role == 'company' ? 'Company ID Proof ' : 'Employee ID Proof '}{!flag ? <sup className="text-danger">*</sup> : ''}</Form.Label><br></br>
                    <Image
                      width={200}
                      src={imageTwo}
                      alt='image'
                    />
                  </Form.Group>
                </Col>
                {role == 'employee' &&
                  <Col lg={4} sm={4} md={4} className="profile-image">
                    <Form.Group>
                      <Form.Label>Pan Card {!flag ? <sup className="text-danger">*</sup> : ''}</Form.Label><br></br>
                      <Image
                        width={200}
                        src={imageThree}
                        alt='image'
                      />
                    </Form.Group>
                  </Col>
                }
              </Row>
              <div className="approve-button-container">
                {userTypes === 'Approved' ? '' : <span><Button className="reject-user-button" onClick={() => { handleShow('reject') }}>Reject</Button></span>}
                <span><Button className={userTypes === 'Approved' ? "btn-primary" : "approve-user-button"} onClick={() => { userTypes === 'Approved' && !save ? editUser() : userTypes === 'Approved' && save ? onSave('save') : handleShow('approve') }}>{userTypes === 'Approved' && !save ? 'Edit' : userTypes === 'Approved' && save ? 'Save' : 'Approve'}</Button></span>
              </div>
            </div>
          }
          {!flag &&
            <React.Fragment>
              <span className="ml-3 mt-5"> <sup className="text-danger">*</sup> Required fields</span>
              {role === 'employee' && <p className="ml-3 mt-2"><sup className="text-danger">*</sup> Please enter your name same as bank account details</p>}
              <div className="d-flex flex-row justify-content-end mt-1">
                <span><Button className="save-continue" onClick={gotoProofUpload}>Save & Continue</Button></span>
              </div>
            </React.Fragment>
          }
        </Card>
      </Row>
      <UserStatusManage show={show} handleClose={handleClose} decision={decision} userID={userDetails && userDetails._id} assingCompanies={assingCompanies} />
    </Container>
  );
};

export default PersonalDetails;
