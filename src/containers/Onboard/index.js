/*eslint-disable*/
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import jwt_decode from "jwt-decode";
import StepProgressBar from 'react-step-progress';
import { history } from './../../routes';
import { Container } from 'react-bootstrap';
import PersonalDetails from './PersonalDetails';
import ProofUpload from './ProofUpload';
import LoginCredentials from './LoginCredentials';

const Onboard = (props) => {
  const selectedOption = props.location && props.location.state;

  const dispatch = useDispatch();
  const employee = useSelector((state) => state.employee.employee);
  const invalidEmployee = useSelector((state) => state.employee.error);
  const employeeToken = employee && `${employee.employeeToken}`;

  const client = useSelector((state) => state.client.client);
  const invalidClient = useSelector((state) => state.client.error);
  const clientToken = client && `${client.clientToken}`;

  const company = useSelector((state) => state.company.company);
  const invalidCompany = useSelector((state) => state.company.error);
  const companyToken = company && `${company.companyToken}`;

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
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formValidate, setFormValidate] = useState('validate-form');

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

  const onChangeConfirmPassword = (confirmPwd) => {
    setConfirmPassword(confirmPwd);
  };

  const onFormSubmit = () => {
    if (selectedOption === 'Employee') {
      if (!firstName && stepValidation) {
        setFormValidate('border-danger')
        window.alert("enter the first name")
      } else {
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
          uploadPanCard: fileName,
          uploadAdhar: empID,
          uploadCancelled: cancelledCheque,
          onBoardedStatus: 'Not Approved'
        };
        dispatch(
          {
            type: 'EMPLOYEE_REQUEST',
            employeeDetails
          });
      }
      // history.push('/');
    } else if (selectedOption === 'client') {
      const clientDetails = {
        name: firstName,
        email,
        phoneNumber,
        companyName,
        password,
        uploadAuthendicationLetterClient: fileName,
        uploadCompanyIdClient: empID,
      };
      dispatch(
        {
          type: 'CLIENT_REQUEST',
          clientDetails
        });
      // history.push('/');
    } else if (selectedOption === 'company') {
      const companyDetails = {
        name: firstName,
        email,
        phoneNumber,
        companyName,
        password,
        uploadAuthendicationLetterCompany: fileName,
        uploadCompanyIdCompany: empID,
      };
      dispatch(
        {
          type: 'COMPANY_REQUEST',
          companyDetails
        });
      // history.push('/');
    }
  };
  const stepValidator = firstName;
  const PersonalValidator = () => {
    const isStateValid = stepValidator;
    console.log("state valid : ", isStateValid);
    console.log("getting name: ", name);

    if (!firstName) {
      return true;
    } else {
      return true;
    }
  }

  return (
    <Container>
      <StepProgressBar
        startingStep={0}
        onSubmit={onFormSubmit}
        contentClass="step-content"
        nextBtnName="Save & Continue"
        previousBtnName="Back"
        primaryBtnClass="save-continue"
        secondaryBtnClass="back"
        steps={[
          {
            label: 'Personal Details',
            name: 'step 1',
            content: <PersonalDetails
              role={selectedOption}
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
              name={name}
            />,
            validator: PersonalValidator,
          },
          {
            label: 'Proof Upload',
            name: 'step 2',
            content: <ProofUpload
              role={selectedOption}
              onCompany={onChangeCompanyRep}
              onEmployeeId={onChangeEmployeeId}
              onCancelledCheque={onChangeCancelledCheque}
              validate={formValidate}
            />,
          },
          {
            label: 'Login Credentials',
            name: 'step 3',
            content: <LoginCredentials
              role={selectedOption}
              onPassword={onChangePassword}
              onConfirmPassword={onChangeConfirmPassword}
              validate={formValidate}
            />,
          },
        ]}
      />
    </Container>
  );
};

export default Onboard;
