/*eslint-disable*/
import React, { useState, useRef, useEffect } from 'react';
// progress bar
import StepProgressBar from 'react-step-progress';
import { Card, Form, Row, Col, Container, Button } from 'react-bootstrap';
import { history } from './../../routes';

const Onboard = () => {
  // stepper form
  const [personal, setPersonal] = useState({
    name: '',
    email: '',
    compName: '',
    repId: '',
    mobile: '',
  });
  const [fileName, setFileName] = useState('');
  const [empID, setEmpID] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [activeStep, setActiveStep] = useState(0);
  const [bar,setBar] = useState(false);
  // Refs
  const personalInfo = useRef();
  const proofUpload = useRef();
  const credentialInfo = useRef();

  useEffect(() => {
      if(bar){
        setActiveStep(activeStep + 1);
      }
      setBar(false);
  },[activeStep]);
  
  const goToProofUpload = () => {
    // setActiveStep(activeStep + 1);
    setBar(true);
    console.log(`"Goto Profile Upload :"+ ${activeStep}`);
    personalInfo.current.classList.add('display-hidden');
    proofUpload.current.classList.remove('display-hidden');
  };
  const onBackPersonalDetails = () => {
    setActiveStep(activeStep - 1);
    personalInfo.current.classList.remove('display-hidden');
    proofUpload.current.classList.add('display-hidden');
    credentialInfo.current.classList.add('display-hidden');
  };

  const goToLoginCredentials = () => {
    setActiveStep(activeStep + 1);
    personalInfo.current.classList.add('display-hidden');
    proofUpload.current.classList.add('display-hidden');
    credentialInfo.current.classList.remove('display-hidden');
  };

  const backToProofUpload = () => {
    setActiveStep(activeStep - 1);
    personalInfo.current.classList.add('display-hidden');
    proofUpload.current.classList.remove('display-hidden');
    credentialInfo.current.classList.add('display-hidden');
  };

  // personal details value change
  const onValueChange = (e) => {
    setPersonal(e.target.value);
  };

  //  Proof upload
  const onChangeCompRep = (e) => {
    setFileName(e.target.files[0].name);
  };
  const onChangeEmpId = (e) => {
    setEmpID(e.target.files[0].name);
  };

  // Login credentials
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  // From submission
  const handleSubmit = () => {
    history.push('/');
  };

  //   Stepper functions
  const onFormSubmit = () => {

  };
    //   React.useEffect(() => {
    //     console.log(activeStep);
    //   });
  return (
    console.log("return", activeStep),
      <Container>
      <h1>{activeStep}</h1>
      {/* stepper */}
      <StepProgressBar
          startingStep={activeStep}
          onSubmit={onFormSubmit}
          steps={[
          {
            label: 'Personal Details',
            name: 'step 1',
          },
          {
            label: 'Proof Upload',
            name: 'step 2',
          },
          {
            label: 'Login Credentials',
            name: 'step 3',
          },
        ]}
        />
      {/*  Form Starting */}
      <h3 className="onboarding-form">Onborading Form</h3>
      {/* personal Information */}
      <Row
          ref={personalInfo}
          className=""
        >
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
                  value={personal.name}
                  onChange={onValueChange}
                />
                </Form.Group>
              <Form.Group>
                  <Form.Label>Company Name*</Form.Label>
                  <Form.Control
                  className=""
                  type="text"
                  name="companyname"
                  id="conpantname"
                  value={personal.compName}
                  onChange={onValueChange}
                />
                </Form.Group>
              <Form.Group>
                  <Form.Label>Repreentative ID*</Form.Label>
                  <Form.Control
                  className=""
                  type="text"
                  name="repid"
                  id="repid"
                  value={personal.repId}
                  onChange={onValueChange}
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
                  value={personal.email}
                  onChange={onValueChange}
                />
                </Form.Group>
              <Form.Group>
                  <Form.Label>Phone*</Form.Label>
                  <Form.Control
                  className=""
                  type="phone"
                  name="phone"
                  id="phone"
                  value={personal.mobile}
                  onChange={onValueChange}
                />
                </Form.Group>
            </Col>
            </Row>
        </Card>
          <div className="w-100 justify-content-end">
          <Button
              className="save-btn align-items-right float-right shadow"
              onClick={goToProofUpload}
            >Save & Continue
            </Button>
        </div>
        </Row>
      {/* Proof upload */}
      <Row
          ref={proofUpload}
          className="display-hidden"
        >
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
                  label={fileName}
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
                  label={empID}
                  onChange={onChangeEmpId}
                  custom
                />
                </Form.Group>
            </Col>
            </Row>
        </Card>
          <div className="w-100">
          <Button className="btn-back shadow" onClick={onBackPersonalDetails}> Back </Button>
          <Button className="save-btn float-right shaodw" onClick={goToLoginCredentials}>Save & Continue</Button>
        </div>
        </Row>
      {/* Login Credentials */}
      <Row
          ref={credentialInfo}
          className="display-hidden"
        >
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
                  value={password}
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
                  value={confirmpassword}
                  onChange={handleConfirmPassword}
                />
                </Form.Group>
            </Col>
            </Row>
        </Card>
          <div className="w-100">
          <Button className="btn-back shadow" onClick={backToProofUpload}> Back </Button>
          <Button className="save-btn float-right shadow" onClick={handleSubmit}>Submit</Button>
        </div>
        </Row>
    </Container>
  );
};

export default Onboard;
