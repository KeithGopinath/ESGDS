/*eslint-disable*/
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StepProgressBar from 'react-step-progress';
import { history } from './../../routes';
import { Container } from 'react-bootstrap';
import PersonalDetails from './PersonalDetails';
import ProofUpload from './ProofUpload';
import LoginCredentials from './LoginCredentials';
import { useEffect } from 'react';

const Onboard = (props) => {
  const selectedOption = props.location && props.location.state;
// const [role, setRole] = useState("");

// console.log("Role : ", role);
// const [firstName, setFirstName] = useState('');

// const dispatch = useDispatch();
// const employee = useSelector((state) => state.employeeState.employee);
// const invalidEmployee = useSelector((state) => state.employeeState.error);
// const token = employee && `${employee.token}`;
// console.log('login token: ', token)

// personal details
// const onFirstNameChange = (firstName, onFirstNameChange) => {
//   console.log('on FIrst name change :',onFirstNameChange );
//   console.log('on FIrst name :',firstName );
// };

const onFormSubmit = () => {
  // console.log('on FIrst name change :',onFirstNameChange );
  // console.log('on FIrst name :',firstName );
  // const employeeDetails = {
  //   firstName,
  //   middleName,
  //   lastName,
  //   email,
  //   mobile,
  //   pancardNumber,
  //   aadharNo,
  //   accountNumber,
  //   bankIfsc,
  //   fileName, //pancard
  //   empID, //aadharcard
  //   cancelledCheque,
  //   password
  // }
  // dispatch(
  //   {
  //     type: 'EMPLOYEE_REQUEST',
  //     employeeDetails
  //   });
  history.push('/');
};
const [firstName, setFirstName] = useState('');
// const [email, setEmail] = useState('');
// const [companyName, setCompanyName] = useState('');
// const [phoneNumber, setPhoneNumber] = useState('');
// const [lastName, setLastName] = useState('');
// const [middleName, setMiddleName] = useState('');
// const [pancardNumber, setPancardNumber] = useState('');
// const [adharCard, setAdharCard] = useState('');
// const [bankAccountNumber, setBankAccountNumber] = useState('');
// const [bankIFSCCode, setBankIFSCCode] = useState('');

const onFirstNameChange = (firstName) => {
  setFirstName(firstName);
  console.log("first name: ", firstName);
};

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
            />,
          },
          {
            label: 'Proof Upload',
            name: 'step 2',
            content: <ProofUpload 
            role={selectedOption}
             />,
          },
          {
            label: 'Login Credentials',
            name: 'step 3',
            content: <LoginCredentials
            role={selectedOption}
             />,
          },
        ]}
      />
    </Container>
  );
};

export default Onboard;
