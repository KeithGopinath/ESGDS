/*eslint-disable*/
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import StepWizard from 'react-step-wizard';
import { Container } from 'react-bootstrap';
// import './styles.scss';
import PersonalDetails from './PersonalDetails';
import ProofUpload from './ProofUpload';
import LoginCredentials from './LoginCredentials';
import Status from './Status';
import { Stepper, Step, StepLabel } from '@material-ui/core';

const Onboard = (props) => {
  // Queryparams for role
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const getRole = params.get('role');
  const getmailId = params.get('email');

  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [pancardNumber, setPancardNumber] = useState('');
  const [adharCard, setAdharCard] = useState('');
  const [bankAccountNumber, setBankAccountNumber] = useState('');
  const [bankIFSCCode, setBankIFSCCode] = useState('');
  // const [companyName, setCompanyName] = useState('');
  const [fileName, setFileName] = useState('');
  const [empID, setEmpID] = useState('');
  const [cancelledCheque, setCancelledCheque] = useState('');
  const [password, setPassword] = useState('');
  const [activeStep, setActiveStep] = useState(0);
  const [role, setRole] = useState('');

  useEffect(() => {
    if (getRole === 'ClientRepresentative') {
      setRole('client');
    } else if (getRole === 'CompanyRepresentative') {
      setRole('company');
    } else if ((getRole === 'Employee')) {
      setRole('employee');
    }
  }, [])

  const onFirstNameChange = (firstName) => {
    setFirstName(firstName);
  };

  const onMiddleNameChange = (middleName) => {
    setMiddleName(middleName);
  };

  const onLastNameChange = (lastName) => {
    setLastName(lastName);
  };

  const onPhoneNumberChange = (phone) => {
    setPhoneNumber(phone);
  };

  const onPancardChange = (pancard) => {
    setPancardNumber(pancard);
  };

  const onAadharChange = (aadhar) => {
    setAdharCard(aadhar);
  };

  const onBankAccountNumberChange = (bankAccountNo) => {
    setBankAccountNumber(bankAccountNo);
  };

  const onBankIfscChange = (bankIfsc) => {
    setBankIFSCCode(bankIfsc);
  };

  // const onCompanyNameChange = (companyNameChange) => {
  //   setCompanyName(companyNameChange);
  // };

  const onChangeCompanyRep = (companyRep) => {
    setFileName(companyRep);
  };

  const onChangeEmployeeId = (employeeId) => {
    setEmpID(employeeId);
  };

  const onChangeCancelledCheque = (cancellCheque) => {
    setCancelledCheque(cancellCheque);
  };

  const onChangePassword = (passwordValue) => {
    setPassword(passwordValue);
  };

  //validating spaces:
  const validatingSpaces = (spacing) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(spacing);
  };

  const onFormSubmit = () => {
    if (role === 'employee') {
      const employeeDetails = {
        roleName: "Employee",
        firstName,
        middleName,
        lastName,
        email: getmailId,
        phoneNumber,
        panNumber: pancardNumber,
        aadhaarNumber: adharCard,
        bankAccountNumber,
        bankIFSCCode,
        accountHolderName: `${firstName} ${middleName && `${middleName} `}${lastName}`,
        password,
        pancardUrl: fileName,
        aadhaarUrl: empID,
        cancelledChequeUrl: cancelledCheque,
      };
      const jsonString = JSON.stringify(employeeDetails);
      const onboardingData = { onBoardingDetails: btoa(jsonString) };
      dispatch({ type: 'ONBOARD_REQUEST', onboardingData });
    } else if (role === 'client') {
      const clientDetails = {
        roleName: "Client Representative",
        name: firstName,
        email: getmailId,
        phoneNumber,
        // companyName,
        password,
        authenticationLetterForClientUrl: fileName,
        companyIdForClient: empID,
      };
      const jsonString = JSON.stringify(clientDetails);
      const onboardingData = { onBoardingDetails: btoa(jsonString) };
      dispatch({ type: 'ONBOARD_REQUEST', onboardingData });
    } else if (role === 'company') {
      const companyDetails = {
        roleName: "Company Representative",
        name: firstName,
        email: getmailId,
        phoneNumber,
        // companiesList: companyName,
        password,
        authenticationLetterForCompanyUrl: fileName,
        companyIdForCompany: empID,
      };
      const jsonString = JSON.stringify(companyDetails);
      const onboardingData = { onBoardingDetails: btoa(jsonString) };
      dispatch({ type: 'ONBOARD_REQUEST', onboardingData });
    }
  };

  // stepper 
  const getSteps = () => {
    return ['Personal Details', 'Proof Upload', 'Login Credentials'];
  };

  const steps = getSteps();

  return (
    <Container>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <StepWizard>
        <PersonalDetails
          role={role}
          firstName={firstName}
          onFirstName={onFirstNameChange}
          onMiddleName={onMiddleNameChange}
          onLastName={onLastNameChange}
          getMailId={getmailId}
          onPhone={onPhoneNumberChange}
          onPancard={onPancardChange}
          onAadhar={onAadharChange}
          onBankAccount={onBankAccountNumberChange}
          onBankIfsc={onBankIfscChange}
          // onCompanyName={onCompanyNameChange}
          setActiveStep={setActiveStep}
          activeStep={activeStep}
          validatingSpaces={validatingSpaces}
        />
        <ProofUpload
          role={role}
          onCompany={onChangeCompanyRep}
          onEmployeeId={onChangeEmployeeId}
          onCancelledCheque={onChangeCancelledCheque}
          setActiveStep={setActiveStep}
          activeStep={activeStep}
          onSubmit={onFormSubmit}
        />
        <LoginCredentials
          role={role}
          onPassword={onChangePassword}
          onSubmit={onFormSubmit}
          setActiveStep={setActiveStep}
          activeStep={activeStep}
          validatingSpaces={validatingSpaces}
        />
        <Status
          setActiveStep={setActiveStep}
          activeStep={activeStep}
        />
      </StepWizard>
    </Container>
  );
};

export default Onboard;
