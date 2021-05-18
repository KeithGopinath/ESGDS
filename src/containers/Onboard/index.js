/*eslint-disable*/
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StepWizard from 'react-step-wizard';
import { history } from './../../routes';
import { Container } from 'react-bootstrap';
import PersonalDetails from './PersonalDetails';
import ProofUpload from './ProofUpload';
import LoginCredentials from './LoginCredentials';
import { Stepper, Step, StepLabel } from '@material-ui/core';

const Onboard = (props) => {
  const selectedOption = props.location && props.location.state;

  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [pancardNumber, setPancardNumber] = useState('');
  const [adharCard, setAdharCard] = useState('');
  const [bankAccountNumber, setBankAccountNumber] = useState('');
  const [bankIFSCCode, setBankIFSCCode] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [fileName, setFileName] = useState('');
  const [empID, setEmpID] = useState('');
  const [cancelledCheque, setCancelledCheque] = useState('');
  const [password, setPassword] = useState('');
  const [activeStep, setActiveStep] = useState(0);

  const onFirstNameChange = (firstName) => {
    setFirstName(firstName);
  };

  const onMiddleNameChange = (middleName) => {
    setMiddleName(middleName);
  };

  const onLastNameChange = (lastName) => {
    setLastName(lastName);
  };

  const onEmailChange = (email) => {
    setEmail(email);
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

  const onCompanyNameChange = (companyNameChange) => {
    setCompanyName(companyNameChange);
  };

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
    const formData = new FormData();
    if (selectedOption === 'Employee') {
      const employeeDetails = {
        firstName,
        middleName,
        lastName,
        email,
        phoneNumber,
        PANCard: pancardNumber,
        adharCard,
        bankAccountNumber,
        bankIFSCCode,
        nameOfTheAccountHolder: `${firstName} ${middleName && `${middleName} `}${lastName}`,
        password,
      };

      formData.append('onboardingdetails', JSON.stringify(employeeDetails));
      formData.append('pancard', fileName);
      formData.append('aadhar', empID);
      formData.append('cancelledcheque', cancelledCheque);

    } else if (selectedOption === 'client') {
      const clientDetails = {
        name: firstName,
        email,
        phoneNumber,
        companyName,
        password,
      };

      formData.append('onboardingdetails', JSON.stringify(clientDetails));
      formData.append('authenticationletterforclient', fileName);
      formData.append('companyidforclient', empID);

    } else if (selectedOption === 'company') {
      const companyDetails = {
        name: firstName,
        email,
        phoneNumber,
        companyName,
        password,
      };

      formData.append('onboardingdetails', JSON.stringify(companyDetails));
      formData.append('authenticationletterforcompany', fileName);
      formData.append('companyidforcompany', empID);

    }

    dispatch({ type: 'ONBOARD_REQUEST', formData });
    // history.push('/users');
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
          role={selectedOption}
          firstName={firstName}
          onFirstName={onFirstNameChange}
          onMiddleName={onMiddleNameChange}
          onLastName={onLastNameChange}
          onEmail={onEmailChange}
          onPhone={onPhoneNumberChange}
          onPancard={onPancardChange}
          onAadhar={onAadharChange}
          onBankAccount={onBankAccountNumberChange}
          onBankIfsc={onBankIfscChange}
          onCompanyName={onCompanyNameChange}
          setActiveStep={setActiveStep}
          activeStep={activeStep}
          validatingSpaces={validatingSpaces}
        />
        <ProofUpload
          role={selectedOption}
          onCompany={onChangeCompanyRep}
          onEmployeeId={onChangeEmployeeId}
          onCancelledCheque={onChangeCancelledCheque}
          setActiveStep={setActiveStep}
          activeStep={activeStep}
        />
        <LoginCredentials
          role={selectedOption}
          onPassword={onChangePassword}
          onSubmit={onFormSubmit}
          setActiveStep={setActiveStep}
          activeStep={activeStep}
          validatingSpaces={validatingSpaces}
        />
      </StepWizard>
    </Container>
  );
};

export default Onboard;
