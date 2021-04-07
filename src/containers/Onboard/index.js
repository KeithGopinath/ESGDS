/*eslint-disable*/
import React, { useState } from 'react';
import StepProgressBar from 'react-step-progress';
import { Card, Form, Row, Col, Container } from 'react-bootstrap';
import { history } from './../../routes';

const Onboard = () => {

  const [userName,setUserName] = useState('');
  const [email,setEmail] = useState('');
  const [companyName,setCompanyName] = useState('');
  const [repId,setRepId] = useState('');
  const [mobile,setMobile] = useState('');
  const [fileName, setFileName] = useState('');
  const [empID, setEmpID] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');

  // personal details value change
  const onNameChange = (e) => {
    setUserName(e.target.value);
    console.log(userName);
  };
  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const onPhoneChange = (e) => {
    setMobile(e.target.value);
  };
  const onCompanyNameChange = (e) => {
    setCompanyName(e.target.value);
  };
  const onRepresentativeIdChange = (e) => {
    setRepId(e.target.value);
  };

  //  Proof upload details changed
  const onChangeCompRep = (e) => {
    setFileName(e.target.files[0].name);
  };

  const onChangeEmpId = (e) => {
    setEmpID(e.target.files[0].name);
  };

  // Login credentials change
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  //   Stepper functions
  const onFormSubmit = () => {
    history.push('/');
  };

//   Personal Details
  const personalDetailsContent = () => (
    <Row className="personal-content">
      <Card className="personal-details shadow mb-5">
        <h4 className="personal-text">Personal Details</h4>
        <Row className="d-flex justify-content-around">
          <Col lg={5} sm={6} md={6}>
            <Form.Group>
              <Form.Label>Name*</Form.Label>
              <Form.Control
                className=""
                type="text"
                name="name"
                id="name"
                value={userName}
                onChange={onNameChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Company Name*</Form.Label>
              <Form.Control
                className=""
                type="text"
                name="companyname"
                id="conpantname"
                onChange={onCompanyNameChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Repreentative ID*</Form.Label>
              <Form.Control
                className=""
                type="text"
                name="repid"
                id="repid"
                onChange={onRepresentativeIdChange}
              />
            </Form.Group>
          </Col>
          <Col lg={5} sm={6} md={6}>
            <Form.Group>
              <Form.Label>Email*</Form.Label>
              <Form.Control
                className=""
                type="email"
                name="email"
                id="email"
                onChange={onEmailChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Phone*</Form.Label>
              <Form.Control
                className=""
                type="tel"
                name="phone"
                id="phone"
                onChange={onPhoneChange}
              />
            </Form.Group>
          </Col>
        </Row>
      </Card>
    </Row>
  );

//  Proof Upload
  const proofUploadContent = () => (
    <Row className="proof-content">
      <Card className="proof-details shadow mb-5">
        <h4 className="proof-text">Proof Upload</h4>
        <Row className="d-flex justify-content-around">
          <Col sm={6} md={6} lg={4} >
            <Form.Group>
              <Form.Label>Upload your letter fo Authentication(for company representative)</Form.Label>
              <Form.File
                type="file"
                className=""
                id=""
                label=""
                onChange={onChangeCompRep}
                custom
              />
            </Form.Group>
          </Col>
          <Col sm={6} md={6} lg={4}>
            <Form.Group>
              <Form.Label>Upload your employee ID proof(for company representative)</Form.Label>
              <Form.File
                type="file"
                className=""
                id=""
                label=""
                onChange={onChangeEmpId}
                custom
              />
            </Form.Group>
          </Col>
        </Row>
      </Card>
    </Row>
  );
//  Login Credentials
  const loginCredentialContent = () => (
    <Row className="login-content">
      <Card className="logincred-details shadow mb-5">
        <h4 className="logincred-text">Login Credentials</h4>
        <Row className="d-flex justify-content-around">
          <Col lg={5} md={6} sm={6}>
            <Form.Group>
              <Form.Label>Create pssword*</Form.Label>
              <Form.Control
                className=""
                type="password"
                name="createpassword"
                id="createpassword"
                onChange={handlePassword}
              />
            </Form.Group>
          </Col>
          <Col lg={5} md={6} sm={6}>
            <Form.Group>
              <Form.Label>Confirm pssword*</Form.Label>
              <Form.Control
                className=""
                type="password"
                name="confirmpassword"
                id="confirmpassword"
                onChange={handleConfirmPassword}
              />
            </Form.Group>
          </Col>
        </Row>
      </Card>
    </Row>
  );
  return (
    <Container>
      <h3 className="onboarding-form">Onborading Form</h3>
      {/* stepper */}
      <StepProgressBar
        startingStep={0}
        onSubmit={onFormSubmit}
        nextBtnName="Save & Continue"
        contentClass="step-content"
        previousBtnName="Back"
        secondaryBtnClass="back"
        primaryBtnClass="save-continue"
        steps={[
          {
            label: 'Personal Details',
            name: 'step 1',
            content: personalDetailsContent(),
          },
          {
            label: 'Proof Upload',
            name: 'step 2',
            content: proofUploadContent(),
          },
          {
            label: 'Login Credentials',
            name: 'step 3',
            content: loginCredentialContent(),
          },
        ]}
      />
      
    </Container>
  );
};

export default Onboard;
